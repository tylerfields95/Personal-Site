import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly isExpanded = signal(false);
  readonly widthClass = computed(() => (this.isExpanded() ? 'w-64' : 'w-16'));
  readonly justificationClass = computed(() =>
    this.isExpanded() ? 'justify-between' : 'justify-center'
  );

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.isExpanded.update((v) => !v);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToSecondPage(): void {
    this.router.navigate(['/second']);
  }
}
