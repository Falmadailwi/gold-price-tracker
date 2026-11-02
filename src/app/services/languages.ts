import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
export type Lang = 'ar' | 'en';

const DICT: Record<string, Record<Lang, string>> = {
  brand: { ar: 'الذهب العُماني', en: 'Oman Gold' },
  navPrices: { ar: 'الأسعار', en: 'Prices' },
  navCalc: { ar: 'حاسبة الذهب', en: 'Calculator' },
  navChart: { ar: 'تغير الأسعار', en: 'Price Trend' },
  navHistory: { ar: 'سجل الأسعار', en: 'Price History' },
  langBtn: { ar: 'EN', en: 'عربي' },

  breadcrumb: { ar: 'الرئيسية / أسعار الذهب في عُمان', en: 'Home / Gold Prices in Oman' },
  heroTitle1: { ar: 'لوحة أسعار', en: 'Gold Prices' },
  heroTitle2: { ar: 'الذهب في عُمان', en: 'in Oman' },
  heroText: {
    ar: 'تابع أسعار الذهب لجميع العيارات، واحسب قيمة ذهبك، وشاهد تغير الأسعار خلال آخر 30 يومًا.',
    en: 'Follow gold prices for every karat, calculate the value of your gold, and see the price changes over the last 30 days.',
  },
  heroNote: {
    ar: 'حوّل الوزن والعيار إلى قيمة مرجعية فورًا.',
    en: 'Convert weight and karat to a reference value, instantly.',
  },
  lastUpdate: { ar: 'آخر تحديث', en: 'Last update' },
  market: { ar: 'السوق: مسقط - سلطنة عُمان', en: 'Market: Muscat, Sultanate of Oman' },
  currencyLine: { ar: 'العملة: ريال عُماني', en: 'Currency: Omani Rial' },

  todayPrices: { ar: 'أسعار الذهب اليوم', en: "Today's Gold Prices" },
  karat: { ar: 'عيار', en: 'Karat' },
  karatWord: { ar: 'قيراط', en: 'K' },
  currency: { ar: 'ر.ع.', en: 'OMR' },
  unit: { ar: 'جرام', en: 'gram' },

  calcTitle: { ar: 'حاسبة الذهب', en: 'Gold Calculator' },
  weightLabel: { ar: 'وزن القطعة', en: 'Item weight' },
  gram: { ar: 'جرام (g)', en: 'Grams (g)' },
  ounce: { ar: 'أونصة (oz)', en: 'Ounces (oz)' },
  purity: { ar: 'عيار الذهب', en: 'Gold purity' },
  currencyLabel: { ar: 'العملة', en: 'Currency' },
  calcBtn: { ar: 'احسب', en: 'Calculate' },
  resetBtn: { ar: 'إعادة تعيين', en: 'Reset' },
  calcEmpty: {
    ar: 'اختر العيار وأدخل الوزن ثم اضغط "احسب" لعرض القيمة التقديرية.',
    en: 'Choose the karat, enter the weight, then press "Calculate" to see the estimated value.',
  },
  totalValue: { ar: 'القيمة الإجمالية التقديرية', en: 'Estimated total value' },
  dealer: { ar: 'تقدير عرض التاجر', en: 'Dealer payout estimate' },
  scrap: { ar: 'خردة', en: 'Scrap' },
  private: { ar: 'خاص', en: 'Private' },
  spot: { ar: 'السعر الفوري', en: 'Spot price' },
  disclaimer: {
    ar: 'القيم تقديرية وقد تختلف العروض الفعلية.',
    en: 'Values are estimates. Actual offers may vary.',
  },

  chartTitle: { ar: 'تغير أسعار الذهب خلال آخر 30 يومًا', en: 'Gold Price Change Over the Last 30 Days' },
  currentPrice: { ar: 'السعر الحالي', en: 'Current price' },
  highest: { ar: 'أعلى سعر', en: 'Highest price' },
  lowest: { ar: 'أقل سعر', en: 'Lowest price' },
  previous: { ar: 'السعر السابق', en: 'Previous price' },
  change: { ar: 'التغير', en: 'Change' },

  historyTitle: { ar: 'جدول سجل الأسعار (آخر 30 يومًا)', en: 'Price History (Last 30 Days)' },
  date: { ar: 'التاريخ', en: 'Date' },

  footerCity: { ar: 'مسقط، سلطنة عُمان', en: 'Muscat, Sultanate of Oman' },
  rights: { ar: '© 2026 جميع الحقوق محفوظة', en: '© 2026 All rights reserved' },

  loading: { ar: 'جاري تحميل الأسعار...', en: 'Loading prices...' },
  loadError: {
    ar: 'تعذر تحميل الأسعار من الخادم. تأكد من تشغيل الـ API.',
    en: 'Could not load prices from the server. Make sure the API is running.',
  },
};

@Injectable({ providedIn: 'root' })
export class Languages {
  private doc = inject(DOCUMENT);
  current = signal<Lang>('ar');

  constructor() {
    // Runs every time the language changes: updates page language and direction
    effect(() => {
      const l = this.current();
      this.doc.documentElement.lang = l;
      this.doc.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    });
  }

  t(key: string): string {
    return DICT[key]?.[this.current()] ?? key;
  }

  toggle() {
    this.current.update((l) => (l === 'ar' ? 'en' : 'ar'));
  }
}