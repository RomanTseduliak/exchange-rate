import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Currency } from './models/currency.model';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'exchange-rate';
  behaviorSubject = new BehaviorSubject<Currency[]>([]);

  constructor(private currencyService: CurrencyService) {}
  ngOnInit() {
    this.currencyService
      .getData()
      .subscribe((data: Currency[]) =>
        this.currencyService.setCurrencies(data)
      );
  }
}
