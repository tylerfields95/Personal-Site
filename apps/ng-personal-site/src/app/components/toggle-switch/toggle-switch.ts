import { Component, model } from '@angular/core';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-toggle-switch',
  imports: [],
  templateUrl: './toggle-switch.html',
  styleUrl: './toggle-switch.scss',
})
export class ToggleSwitch {
  readonly state = model<boolean>(false);

  constructor(public themeService: Theme) {}

  public toggleState(): void {
    this.state.update((v) => !v);
  }
}
