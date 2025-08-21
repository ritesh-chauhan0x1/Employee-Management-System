import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkThemeKey = 'dark-theme';

  isDarkTheme(): boolean {
    return localStorage.getItem(this.darkThemeKey) === 'true';
  }

  setDarkTheme(isDark: boolean) {
    localStorage.setItem(this.darkThemeKey, String(isDark));
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  toggleTheme() {
    this.setDarkTheme(!this.isDarkTheme());
  }
}
