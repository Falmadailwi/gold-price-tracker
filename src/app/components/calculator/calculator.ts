import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Gold } from '../../services/gold';
import { Languages } from '../../services/languages';
import { Karat } from '../../models/gold.model';

@Component({
  selector: 'app-calculator',
  imports: [FormsModule, DecimalPipe],
  template: `
    <section id="calculator" class="mx-auto max-w-5xl px-4 py-8">
      <div class="overflow-hidden rounded-xl bg-white shadow-lg">
        <div class="bg-[#231F20] px-6 py-4">
          <h2 class="text-lg font-bold tracking-wide text-[#AD974F]">{{ lang.t('calcTitle') }}</h2>
        </div>

        <div class="grid gap-6 p-6 md:grid-cols-2">
          <div class="space-y-5">
            <div>
              <label class="mb-1 block text-xs font-bold text-gray-700">{{ lang.t('weightLabel') }}</label>
              <div class="flex gap-2">
                <input type="number" min="0" [(ngModel)]="weight" placeholder="10"
                       class="w-full rounded-lg border border-gray-300 p-3" />
                <select [(ngModel)]="unit" class="rounded-lg border border-gray-300 p-3">
                  <option value="g">{{ lang.t('gram') }}</option>
                  <option value="oz">{{ lang.t('ounce') }}</option>
                </select>
              </div>
            </div>

            <div>
              <label class="mb-1 block text-xs font-bold text-gray-700">{{ lang.t('purity') }}</label>
              <select [(ngModel)]="karat" class="w-full rounded-lg border border-gray-300 p-3">
                @for (k of gold.karats; track k) {
                  <option [ngValue]="k">{{ lang.t('karat') }} {{ k }}</option>
                }
              </select>
            </div>

            <div>
              <label class="mb-1 block text-xs font-bold text-gray-700">{{ lang.t('currencyLabel') }}</label>
              <select [(ngModel)]="currency" class="w-full rounded-lg border border-gray-300 p-3">
                @for (c of currencies; track c.code) {
                  <option [ngValue]="c.code">{{ c.code }} - {{ lang.current() === 'ar' ? c.ar : c.en }}</option>
                }
              </select>
            </div>

            <button (click)="calculate()"
                    class="w-full rounded-lg bg-[#AD974F] py-3 font-bold text-white hover:bg-[#8E793E]">{{ lang.t('calcBtn') }}</button>
            <button (click)="reset()"
                    class="w-full rounded-lg bg-gray-100 py-3 font-bold text-gray-500 hover:bg-gray-200">{{ lang.t('resetBtn') }}</button>
          </div>

          <div class="rounded-xl border border-gray-200 bg-gray-50 p-6">
            @if (result === null) {
              <div class="flex h-full min-h-60 items-center justify-center text-center text-gray-500">
                {{ lang.t('calcEmpty') }}
              </div>
            } @else {
              <div class="text-center">
                <div class="text-xs font-bold tracking-widest text-gray-500">{{ lang.t('totalValue') }}</div>
                <div class="my-2 text-4xl font-extrabold text-green-600" dir="ltr">
                  {{ result | number: '1.2-2' }} {{ shownCurrency }}
                </div>
                <div class="text-sm text-gray-600">
                  {{ shownWeight }} {{ lang.t(shownUnit === 'g' ? 'gram' : 'ounce') }} · {{ lang.t('karat') }} {{ shownKarat }}
                </div>
              </div>
              <div class="mt-5 border-t border-gray-200 pt-4">
                <div class="mb-2 text-xs font-bold text-gray-700">{{ lang.t('dealer') }}</div>
                @for (p of payouts; track p.pct) {
                  <div class="flex items-center justify-between border-b border-gray-100 py-2 text-sm">
                    <div class="flex items-center gap-2">
                      <span class="rounded bg-slate-200 px-2 py-0.5 text-xs font-bold">{{ p.pct }}%</span>
                      <span class="text-xs italic text-gray-400">{{ lang.t(p.key) }}</span>
                    </div>
                    <span class="font-bold" dir="ltr">{{ result * p.pct / 100 | number: '1.2-2' }}</span>
                  </div>
                }
                <p class="mt-3 text-center text-xs text-gray-400">{{ lang.t('disclaimer') }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Calculator {
  gold = inject(Gold);
  lang = inject(Languages);

  currencies = [
    { code: 'OMR', ar: 'ريال عُماني', en: 'Omani Rial', rate: 1 },
    { code: 'USD', ar: 'دولار أمريكي', en: 'US Dollar', rate: 2.6 },
    { code: 'AED', ar: 'درهم إماراتي', en: 'UAE Dirham', rate: 9.55 },
    { code: 'SAR', ar: 'ريال سعودي', en: 'Saudi Riyal', rate: 9.75 },
  ];
  payouts = [
    { pct: 70, key: 'scrap' },
    { pct: 80, key: 'scrap' },
    { pct: 90, key: 'private' },
    { pct: 100, key: 'spot' },
  ];

  karat: Karat = 21;
  weight: number | null = 10;
  unit: 'g' | 'oz' = 'g';
  currency = 'OMR';

  result: number | null = null;
  shownCurrency = '';
  shownWeight = 0;
  shownUnit: 'g' | 'oz' = 'g';
  shownKarat: Karat = 21;

  calculate() {
    if (!this.weight || this.weight <= 0) {
      this.result = null;
      return;
    }
    const grams = this.unit === 'g' ? this.weight : this.weight * 31.1035;
    const omr = grams * this.gold.today.prices[this.karat];
    const rate = this.currencies.find((c) => c.code === this.currency)?.rate ?? 1;
    this.result = omr * rate;
    this.shownCurrency = this.currency;
    this.shownWeight = this.weight;
    this.shownUnit = this.unit;
    this.shownKarat = this.karat;
  }

  reset() {
    this.weight = null;
    this.karat = 21;
    this.unit = 'g';
    this.currency = 'OMR';
    this.result = null;
  }
}