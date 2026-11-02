import { Component, inject } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { PriceSection } from './components/price-section/price-section';
import { Calculator } from './components/calculator/calculator';
import { PriceChart } from './components/price-chart/price-chart';
import { HistoryTable } from './components/history-table/history-table';
import { Footer } from './components/footer/footer';
import { Gold } from './services/gold';
import { Languages } from './services/languages';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, PriceSection, Calculator, PriceChart, HistoryTable, Footer],
  template: `
    <app-header />
    @if (gold.loaded()) {
      <app-hero />
      <app-price-section />
      <app-calculator />
      <app-price-chart />
      <app-history-table />
    } @else if (gold.error()) {
      <p class="p-10 text-center text-red-600">{{ lang.t('loadError') }}</p>
    } @else {
      <p class="p-10 text-center text-gray-500">{{ lang.t('loading') }}</p>
    }
    <app-footer />
  `,
})
export class App {
  gold = inject(Gold);
  lang = inject(Languages);
}