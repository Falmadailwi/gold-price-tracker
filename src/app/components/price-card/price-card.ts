import { Component, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Languages } from '../../services/languages';

@Component({
  selector: 'app-price-card',
  imports: [DecimalPipe],
  template: `
    <div class="bg-[#EAEAEA] px-4 py-5 text-center">
      <div class="text-xs text-gray-500">{{ lang.t('karat') }} {{ karat() }}</div>
      <div class="mt-1 text-xl font-bold text-gray-900">{{ price() | number: '1.3-3' }}</div>
      <div class="text-xs text-gray-500">{{ currency() }} / {{ unit() }}</div>
    </div>
  `,
})
export class PriceCard {
  lang = inject(Languages);
  karat = input.required<number>();
  price = input.required<number>();
  currency = input('');
  unit = input('');
}