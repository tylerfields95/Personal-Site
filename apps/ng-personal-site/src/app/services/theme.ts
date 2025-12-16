import { Injectable, signal, Signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private readonly THEME_STORAGE_KEY = 'isDarkTheme';
  private readonly _isDarkTheme: WritableSignal<boolean> = signal(this.loadThemeFromStorage());
  public readonly isDarkTheme: Signal<boolean> = this._isDarkTheme.asReadonly();

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
}
