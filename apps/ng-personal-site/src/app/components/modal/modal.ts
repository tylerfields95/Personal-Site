import { Component, output, input, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Viewport } from '../../services/viewport';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  readonly isOpen = input<boolean>(false);
  readonly title = input<string>('');
  readonly close = output<void>();

  // Internal signal to manage animation state
  protected isVisible = signal(false);
  protected isClosing = signal(false);

  constructor(private viewport: Viewport) {
    effect(() => {
      const open = this.isOpen();
      if (open) {
        this.isVisible.set(true);
        this.isClosing.set(false);
      } else if (this.isVisible()) {
        // Start closing animation
        this.isClosing.set(true);
        // Wait for animation to finish before hiding
        setTimeout(() => {
          this.isVisible.set(false);
          this.isClosing.set(false);
        }, 200); // Match the fadeOut duration
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    // Only allow backdrop close on landscape devices (portrait users are mobile and might tap accidentally)
    if (event.target === event.currentTarget && this.viewport.isLandscape()) {
      this.onClose();
    }
  }
}
