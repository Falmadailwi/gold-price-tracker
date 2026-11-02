import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Gold } from '../../services/gold';
import { Languages } from '../../services/languages';
import { PriceCard } from '../price-card/price-card';

@Component({
  selector: 'app-price-section',
  imports: [PriceCard, DatePipe],
  template: `
    <section id="prices" class="mx-auto max-w-5xl px-4 py-8">
      <div class="overflow-hidden rounded-xl bg-white shadow-lg">
        <div class="flex items-center justify-between bg-[#231F20] px-6 py-4">
          <h2 class="text-lg font-bold tracking-wide text-[#AD974F]">{{ lang.t('todayPrices') }}</h2>
          <span class="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
            {{ gold.lastUpdate | date: 'dd/MM/yyyy' }}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-px bg-gray-100 md:grid-cols-4">
          @for (k of gold.karats; track k) {
            <app-price-card [karat]="k" [price]="gold.today.prices[k]" [currency]="lang.t('currency')" [unit]="lang.t('unit')" />
          }
        </div>
      </div>
    </section>
  `,
})
export class PriceSection {
  gold = inject(Gold);
  lang = inject(Languages);
}