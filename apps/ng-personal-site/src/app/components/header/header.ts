import { NgClass } from '@angular/common';
import { Component, computed, Signal, signal } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly isExpanded = signal(false);
  readonly isHomeIconHovered = signal(false);
  readonly widthClass = computed(() =>
    this.isExpanded() ? 'h-64 items-end' : 'h-12 items-center'
  );
  public routes: Signal<Routes>;

  constructor(private router: Router) {
    this.routes = signal(this.router.config);
    console.log(this.router.config);
  }

  toggleSidebar(): void {
    this.onLeaveHomeIcon();
    this.isExpanded.update((v) => !v);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  navigateToPath(path?: string): void {
    this.router.navigate([`/${path}`]);
  }

  onEnterHomeIcon(): void {
    this.isHomeIconHovered.set(true);
  }

  onLeaveHomeIcon(): void {
    this.isHomeIconHovered.set(false);
  }
}
