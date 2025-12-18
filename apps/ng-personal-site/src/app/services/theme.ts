import { Injectable, signal, Signal, WritableSignal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private readonly THEME_STORAGE_KEY = 'isDarkTheme';
  private readonly DARK_THEME_COLOR = '#18181b'; // Tailwind zinc-900
  private readonly LIGHT_THEME_COLOR = '#f9f9f9'; // rgb(249, 249, 249)
  private readonly _isDarkTheme: WritableSignal<boolean> = signal(this.loadThemeFromStorage());
  public readonly isDarkTheme: Signal<boolean> = this._isDarkTheme.asReadonly();

  constructor() {
    // Update theme-color meta tag and body class whenever theme changes
    effect(() => {
      const isDark = this._isDarkTheme();
      this.updateThemeColorMetaTag(isDark);
      this.updateBodyThemeClass(isDark);
    });
  }

  public setTheme(value: boolean): void {
    this._isDarkTheme.set(value);
    this.saveThemeToStorage(value);
  }

  private loadThemeFromStorage(): boolean {
    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
    return savedTheme !== null ? JSON.parse(savedTheme) : true; // Default to dark theme
  }

  private saveThemeToStorage(value: boolean): void {
    localStorage.setItem(this.THEME_STORAGE_KEY, JSON.stringify(value));
  }

  private updateThemeColorMetaTag(isDark: boolean): void {
    const themeColor = isDark ? this.DARK_THEME_COLOR : this.LIGHT_THEME_COLOR;
    let metaTag = document.querySelector('meta[name="theme-color"]:not([media])');

    if (metaTag) {
      metaTag.setAttribute('content', themeColor);
    } else {
      // Create meta tag if it doesn't exist
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'theme-color');
      metaTag.setAttribute('content', themeColor);
      document.head.appendChild(metaTag);
    }
  }

  private updateBodyThemeClass(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }
}
