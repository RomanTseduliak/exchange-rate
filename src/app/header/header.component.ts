import { Component } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { Currency } from '../models/currency.model';
import { map } from 'rxjs';

const getFilteredItems = (currencyArray: Currency[]) => {
  return currencyArray.filter(
    (currencyArray) => currencyArray.cc === 'USD' || currencyArray.cc === 'EUR'
  );
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currencies$ = this.currencyService.currencies$.pipe(
    map((currencies: Currency[]) => getFilteredItems(currencies))
  );

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {}
}
