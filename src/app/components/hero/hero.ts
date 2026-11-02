import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Gold } from '../../services/gold';
import { Languages } from '../../services/languages';

@Component({
  selector: 'app-hero',
  imports: [DatePipe],
  template: `
    <section class="relative overflow-hidden bg-[#231F20] text-white">
      <div class="absolute inset-0 bg-cover bg-center opacity-70"
           style="background-image: url('gold-bars.jpg')"></div>
      <div class="absolute inset-0 from-[#231F20] via-[#231F20]/85 to-transparent ltr:bg-linear-to-r rtl:bg-linear-to-l"></div>

      <div class="relative mx-auto max-w-6xl px-4 pt-6 pb-14">
       
        <div class="mb-6 mt-6 flex items-center gap-3">
          <span class="font-bold">Gold Ticker <span class="text-[#AD974F]">Live</span></span>
        </div>

       

        <h1 class="text-4xl font-extrabold leading-tight md:text-6xl">
          {{ lang.t('heroTitle1') }}
          <span class="from-[#AD974F] to-[#8E793E] bg-clip-text text-transparent ltr:bg-linear-to-r rtl:bg-linear-to-l">{{ lang.t('heroTitle2') }}</span>
        </h1>
        <div class="my-5 h-1 w-28 rounded bg-[#AD974F]"></div>
        <p class="max-w-xl text-lg text-gray-300">{{ lang.t('heroText') }}</p>
        <p class="mt-2 text-sm text-gray-500">{{ lang.t('heroNote') }}</p>
      </div>

      <div class="relative border-t border-white/10 bg-black/40">
        <div class="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-2 text-sm text-gray-300">
          <span>{{ lang.t('lastUpdate') }}: {{ gold.lastUpdate | date: 'dd/MM/yyyy' }}</span>
          <span>{{ lang.t('market') }}</span>
          <span>{{ lang.t('currencyLine') }}</span>
        </div>
      </div>
    </section>
  `,
})
export class Hero {
  gold = inject(Gold);
  lang = inject(Languages);
}