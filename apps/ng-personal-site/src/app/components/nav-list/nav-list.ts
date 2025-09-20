import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, Signal, signal } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-nav-list',
  imports: [],
  templateUrl: './nav-list.html',
  styleUrl: './nav-list.scss',
})
export class NavList {
  @Output() navigated = new EventEmitter<void>();

  public routes: Signal<Routes>;

  constructor(private router: Router) {
    this.routes = signal(this.router.config);
  }

  navigateToPath(path?: string): void {
    this.router.navigate([`/${path}`]).then(() => {
      this.navigated.emit();
    });
  }
}
