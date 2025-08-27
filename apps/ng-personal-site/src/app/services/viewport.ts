import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Viewport {
  private readonly _aspectRatio: WritableSignal<number> = signal(this.getAspectRatioDecimal());
  public readonly aspectRatio: Signal<number> = this._aspectRatio.asReadonly();
  public readonly isLandscape: Signal<boolean> = computed(() => this.aspectRatio() >= 1);

  constructor() {
    const handler = () => this._aspectRatio.set(this.getAspectRatioDecimal());
    window.addEventListener('resize', handler, { passive: true });
    window.addEventListener('orientationchange', handler, { passive: true });
  }

  // n > 1 → landscape-ish (e.g., 1920×1080 → 1.777…)
  // n = 1 → square
  // n < 1 → portrait-ish (e.g., 1080×1920 → 0.5625)
  private getAspectRatioDecimal(): number {
    return window.innerWidth / Math.max(1, window.innerHeight);
  }
}
