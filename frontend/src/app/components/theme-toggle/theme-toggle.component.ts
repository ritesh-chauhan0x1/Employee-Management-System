import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `<button mat-icon-button (click)="toggle()" [matTooltip]="themeService.isDarkTheme() ? 'Light Mode' : 'Dark Mode'">
    <mat-icon>{{ themeService.isDarkTheme() ? 'dark_mode' : 'light_mode' }}</mat-icon>
  </button>`
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}
  toggle() {
    this.themeService.toggleTheme();
  }
}
