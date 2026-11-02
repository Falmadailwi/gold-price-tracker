import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { DayPrice, Karat } from '../models/gold.model';

interface ApiPrice {
  karat: number;
  pricePerGram: number;
  currency: string;
  unit: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class Gold {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api/gold-prices';

  readonly karats: Karat[] = [18, 21, 22, 24];
  readonly currency = 'ر.ع.';
  readonly unit = 'جرام';

  history: DayPrice[] = [];
  today: DayPrice = { date: '', prices: { 18: 0, 21: 0, 22: 0, 24: 0 } };

  loaded = signal(false);
  error = signal(false);

  constructor() {
    this.load();
  }

  get lastUpdate(): string {
    return this.today.date;
  }

  private load() {
    forkJoin({
      current: this.http.get<ApiPrice[]>(this.baseUrl),
      history: this.http.get<DayPrice[]>(`${this.baseUrl}/history`),
    }).subscribe({
      next: ({ current, history }) => {
        const prices = {} as Record<Karat, number>;
        current.forEach((p) => (prices[p.karat as Karat] = p.pricePerGram));

        this.today = { date: current[0]?.updatedAt ?? '', prices };
        this.history = history;
        this.loaded.set(true);
      },
      error: () => this.error.set(true),
    });
  }
}