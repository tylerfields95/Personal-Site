import { Component } from '@angular/core';
import { ToggleSwitch } from '../toggle-switch/toggle-switch';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-theme-toggle',
  imports: [ToggleSwitch],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  constructor(public themeService: Theme) {}
}
