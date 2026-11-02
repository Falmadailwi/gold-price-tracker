import { Component, inject } from '@angular/core';
import { Languages } from '../../services/languages';

@Component({
  selector: 'app-header',
  template: `
    <header class="sticky top-0 z-50 bg-[#231F20] shadow-lg">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div class="flex items-center gap-2 md:flex-1">
         <img src="logo.png" alt="Oman Gold logo" class="h-10 w-10 object-contain" />
          <span class="text-xl font-bold text-[#AD974F]">{{ lang.t('brand') }}</span>
        </div>

        <nav class="flex flex-wrap gap-5 text-sm font-medium text-gray-200">
          <a href="#prices" class="hover:text-[#AD974F]">{{ lang.t('navPrices') }}</a>
          <a href="#calculator" class="hover:text-[#AD974F]">{{ lang.t('navCalc') }}</a>
          <a href="#chart" class="hover:text-[#AD974F]">{{ lang.t('navChart') }}</a>
          <a href="#history" class="hover:text-[#AD974F]">{{ lang.t('navHistory') }}</a>
        </nav>

        <div class="flex md:flex-1 md:justify-end">
          <button
            (click)="lang.toggle()"
            class="rounded-lg border border-[#AD974F] px-3 py-1 text-sm font-bold text-[#AD974F] hover:bg-[#AD974F] hover:text-white">
            {{ lang.t('langBtn') }}
          </button>
        </div>
      </div>
    </header>
  `,
})
export class Header {
  lang = inject(Languages);
}