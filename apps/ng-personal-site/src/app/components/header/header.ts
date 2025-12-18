import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { QuickContact } from '../quick-contact/quick-contact';
import { NavList } from '../nav-list/nav-list';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-header',
  imports: [NgClass, QuickContact, NavList, ThemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly isExpanded = signal(false);
  readonly isExpandIcon = signal(false);
  readonly widthClass = computed(() => (this.isExpanded() ? 'h-screen-dynamic' : 'h-12 items-center'));

  constructor(private router: Router) {}

  toggleHeader(): void {
    this.onLeaveExpandButton();
    this.isExpanded.update((v) => !v);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  onEnterExpandButton(): void {
    this.isExpandIcon.set(true);
  }

  onLeaveExpandButton(): void {
    this.isExpandIcon.set(false);
  }
}
