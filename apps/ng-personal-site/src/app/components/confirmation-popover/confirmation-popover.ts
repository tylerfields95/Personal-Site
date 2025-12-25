import { Component, input, output, signal, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export enum PopoverPosition {
  Top = 'top',
  TopLeft = 'top-left',
  TopRight = 'top-right',
  Bottom = 'bottom',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  Left = 'left',
  Right = 'right'
}

export enum PopoverVariant {
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info'
}

@Component({
  selector: 'app-confirmation-popover',
  imports: [CommonModule],
  templateUrl: './confirmation-popover.html',
  styleUrl: './confirmation-popover.scss',
  standalone: true,
})
export class ConfirmationPopover {
  // Expose enums to template
  readonly PopoverPosition = PopoverPosition;
  readonly PopoverVariant = PopoverVariant;

  readonly isOpen = signal(false);
  readonly message = input<string>('Are you sure?');
  readonly confirmText = input<string>('Yes');
  readonly cancelText = input<string>('No');
  readonly position = input<PopoverPosition>(PopoverPosition.Top);
  readonly variant = input<PopoverVariant>(PopoverVariant.Warning);

  readonly confirm = output<void>();
  readonly cancel = output<void>();

  readonly triggerRef = viewChild<ElementRef<HTMLElement>>('trigger');
  readonly popoverStyles = signal<Record<string, string>>({});

  open(): void {
    this.isOpen.set(true);
    this.calculatePosition();
  }

  close(): void {
    this.isOpen.set(false);
  }

  onConfirm(): void {
    this.confirm.emit();
    this.close();
  }

  onCancel(): void {
    this.cancel.emit();
    this.close();
  }

  private calculatePosition(): void {
    const trigger = this.triggerRef()?.nativeElement;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const styles: Record<string, string> = {};
    const gap = 8; // 8px gap between trigger and popover

    const pos = this.position();

    // Vertical positioning
    if (pos === PopoverPosition.Top || pos === PopoverPosition.TopLeft || pos === PopoverPosition.TopRight) {
      styles['bottom'] = `${window.innerHeight - rect.top + gap}px`;
    } else if (pos === PopoverPosition.Bottom || pos === PopoverPosition.BottomLeft || pos === PopoverPosition.BottomRight) {
      styles['top'] = `${rect.bottom + gap}px`;
    } else if (pos === PopoverPosition.Left || pos === PopoverPosition.Right) {
      styles['top'] = `${rect.top + rect.height / 2}px`;
      styles['transform'] = 'translateY(-50%)';
    }

    // Horizontal positioning
    if (pos === PopoverPosition.Top || pos === PopoverPosition.Bottom) {
      styles['left'] = `${rect.left + rect.width / 2}px`;
      styles['transform'] = 'translateX(-50%)';
    } else if (pos === PopoverPosition.TopLeft || pos === PopoverPosition.BottomLeft) {
      styles['left'] = `${rect.left}px`;
    } else if (pos === PopoverPosition.TopRight || pos === PopoverPosition.BottomRight) {
      styles['right'] = `${window.innerWidth - rect.right}px`;
    } else if (pos === PopoverPosition.Left) {
      styles['right'] = `${window.innerWidth - rect.left + gap}px`;
    } else if (pos === PopoverPosition.Right) {
      styles['left'] = `${rect.right + gap}px`;
    }

    this.popoverStyles.set(styles);
  }
}
