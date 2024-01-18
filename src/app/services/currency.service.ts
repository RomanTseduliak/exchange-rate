import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl =
    'https:///bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  currencies$: BehaviorSubject<Currency[]> = new BehaviorSubject<Currency[]>(
    []
  );

  constructor(private http: HttpClient) {}

  getData(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.apiUrl}`);
  }

  setCurrencies(currencies: Currency[]) {
    this.currencies$.next(currencies);
  }
}
