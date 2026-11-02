import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Gold } from '../../services/gold';
import { Languages } from '../../services/languages';
import { Karat } from '../../models/gold.model';

@Component({
  selector: 'app-price-chart',
  imports: [DecimalPipe],
  template: `
    <section id="chart" class="mx-auto max-w-5xl px-4 py-8">
      <div class="overflow-hidden rounded-xl bg-white shadow-lg">
        <div class="bg-[#231F20] px-6 py-4">
          <h2 class="text-lg font-bold tracking-wide text-[#AD974F]">{{ lang.t('chartTitle') }}</h2>
        </div>

        <div class="p-6">
          <div class="mb-5 flex flex-wrap gap-2">
            @for (k of gold.karats; track k) {
              <button
                (click)="selected.set(k)"
                class="rounded-lg border px-4 py-1.5 text-sm font-bold"
                [class]="selected() === k ? 'border-[#AD974F] bg-[#AD974F] text-white' : 'border-gray-300 bg-white text-gray-600'">
                {{ k }} {{ lang.t('karatWord') }}
              </button>
            }
          </div>

          <div class="mb-5 grid grid-cols-3 gap-px overflow-hidden rounded-lg bg-gray-100">
            <div class="bg-[#EAEAEA] p-4 text-center">
              <div class="text-xs text-gray-500">{{ lang.t('currentPrice') }}</div>
              <div class="font-bold">{{ stats().cur | number: '1.3-3' }}</div>
            </div>
            <div class="bg-[#EAEAEA] p-4 text-center">
              <div class="text-xs text-gray-500">{{ lang.t('highest') }}</div>
              <div class="font-bold text-green-600">{{ stats().max | number: '1.3-3' }}</div>
            </div>
            <div class="bg-[#EAEAEA] p-4 text-center">
              <div class="text-xs text-gray-500">{{ lang.t('lowest') }}</div>
              <div class="font-bold text-red-600">{{ stats().min | number: '1.3-3' }}</div>
            </div>
          </div>

          <div class="rounded-xl border border-gray-200 bg-gray-50 p-4" dir="ltr">
            <svg viewBox="0 0 600 200" class="h-64 w-full">
              <polyline [attr.points]="points()" fill="none" stroke="#AD974F" stroke-width="3" stroke-linejoin="round" />
            </svg>
          </div>

          <div class="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm">
            {{ lang.t('currentPrice') }}: <b>{{ stats().cur | number: '1.3-3' }}</b> —
            {{ lang.t('previous') }}: <b>{{ stats().prev | number: '1.3-3' }}</b> —
            {{ lang.t('change') }}:
            <b [class]="stats().diff >= 0 ? 'text-green-600' : 'text-red-600'" dir="ltr">
              {{ stats().diff >= 0 ? '+' : '' }}{{ stats().diff | number: '1.3-3' }}
            </b>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class PriceChart {
  gold = inject(Gold);
  lang = inject(Languages);
  selected = signal<Karat>(24);

  values = computed(() => this.gold.history.map((d) => d.prices[this.selected()]));

  stats = computed(() => {
    const v = this.values();
    const cur = v[v.length - 1];
    const prev = v[v.length - 2];
    return { cur, prev, diff: cur - prev, max: Math.max(...v), min: Math.min(...v) };
  });

  points = computed(() => {
    const v = this.values();
    const min = Math.min(...v);
    const max = Math.max(...v);
    const w = 600, h = 200, pad = 10;
    return v
      .map((val, i) => {
        const x = pad + (i * (w - 2 * pad)) / (v.length - 1);
        const y = h - pad - ((val - min) / (max - min || 1)) * (h - 2 * pad);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  });
}