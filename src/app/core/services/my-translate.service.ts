import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private readonly _translateService = inject(TranslateService);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _renderer2 = inject(RendererFactory2).createRenderer(null, null);

  constructor() {
    if (isPlatformBrowser(this._platformId))
      this.setLang();
  }
  setLang(): void {
    let savedLang = localStorage.getItem('lang');
    if (savedLang !== null) {
      this._translateService.use(savedLang);

      if (savedLang === 'en')
        this._renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      else if (savedLang === 'ar')
        this._renderer2.setAttribute(document.documentElement, 'dir', 'rtl');

      this._renderer2.setAttribute(document.documentElement, 'lang', savedLang);
    }
    else
      this._translateService.setDefaultLang('en');
  }

  changeLang(lang: string): void {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.setItem('lang', lang);
      this.setLang();
    }
  }
}
