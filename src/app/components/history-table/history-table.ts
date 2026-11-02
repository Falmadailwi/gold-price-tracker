import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Gold } from '../../services/gold';
import { Languages } from '../../services/languages';

@Component({
  selector: 'app-history-table',
  imports: [DatePipe, DecimalPipe],
  template: `
    <section id="history" class="mx-auto max-w-5xl px-4 py-8">
      <div class="overflow-hidden rounded-xl bg-white shadow-lg">
        <div class="bg-[#231F20] px-6 py-4">
          <h2 class="text-lg font-bold tracking-wide text-[#AD974F]">{{ lang.t('historyTitle') }}</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[600px] text-center text-sm">
            <thead class="bg-[#EAEAEA] text-xs text-gray-600">
              <tr>
                <th class="p-3">{{ lang.t('date') }}</th>
                @for (k of gold.karats; track k) {
                  <th class="p-3">{{ k }} {{ lang.t('karatWord') }}</th>
                }
              </tr>
            </thead>
            <tbody>
              @for (row of rows(); track row.date) {
                <tr class="border-t border-gray-100 odd:bg-white even:bg-gray-50">
                  <td class="p-3">{{ row.date | date: 'dd/MM/yyyy' }}</td>
                  @for (k of gold.karats; track k) {
                    <td class="p-3 font-semibold">{{ row.prices[k] | number: '1.3-3' }}</td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,
})
export class HistoryTable {
  gold = inject(Gold);
  lang = inject(Languages);
  rows = () => [...this.gold.history].reverse();
}