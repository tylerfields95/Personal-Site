import { NgClass } from '@angular/common';
import { Component, computed, Signal, signal } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { QuickContact } from '../quick-contact/quick-contact';
import { NavList } from '../nav-list/nav-list';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, QuickContact, NavList, ThemeToggle],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly isExpanded = signal(false);
  readonly isHomeIconHovered = signal(false);
  readonly widthClass = computed(() => (this.isExpanded() ? 'w-64' : 'w-16'));
  readonly justificationClass = computed(() =>
    this.isExpanded() ? 'justify-between' : 'justify-center'
  );

  public routes: Signal<Routes>;

  constructor(private router: Router) {
    this.routes = signal(this.router.config);
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
