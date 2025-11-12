import { Injectable, signal, Signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private readonly _isDarkTheme: WritableSignal<boolean> = signal(true);
  public readonly isDarkTheme: Signal<boolean> = this._isDarkTheme.asReadonly();

  public setTheme(value: boolean): void {
    this._isDarkTheme.set(value);
  }
}
