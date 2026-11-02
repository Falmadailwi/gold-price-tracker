export type Karat = 18 | 21 | 22 | 24;

export interface DayPrice {
  date: string;
  prices: Record<Karat, number>;
}