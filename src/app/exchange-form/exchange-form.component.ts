import { CurrencyService } from './../services/currency.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Currency } from '../models/currency.model';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.scss'],
})
export class ExchangeFormComponent {
  currencies$ = this.currencyService.currencies$.pipe(
    map((currencies: Currency[]) => currencies)
  );
  firstValueRate: number = 0;
  secondValueRate: number = 0;
  currencyArray: Currency[] = [];
  event: string = '';

  currencyForm = this.fb.group({
    currencyOne: [''],
    currencyTwo: [''],
    amountOne: [''],
    amountTwo: [''],
  });

  unsubscribe$ = new Subject<void>();

  constructor(
    private currencyService: CurrencyService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subscribeToCurrenciesChange();
  }
  ngOnDestroy() {
    this.unsubscribe$;
  }

  subscribeToCurrenciesChange() {
    this.recalculateFirstValue();
    this.recalculateSecondValue();
  }

  recalculateFirstValue() {
    this.currencyOne.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.amountOne.setValue(value);
        this.firstValueRate = value;
      });
  }

  recalculateSecondValue() {
    this.currencyTwo.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.amountTwo.setValue(value);
        this.secondValueRate = value;
      });
  }
  handleChangeFirstValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const secondValue =
      (Number(this.firstValueRate) * Number(value)) /
      Number(this.secondValueRate);
    this.amountTwo.setValue(secondValue);
  }

  handleChangeSecondValue(event: Event): void {
    const value = (event?.target as HTMLInputElement).value;
    const firstValue =
      (Number(this.secondValueRate) * Number(value)) /
      Number(this.firstValueRate);
    this.amountOne.setValue(firstValue);
  }

  get currencyOne(): FormControl {
    return this.currencyForm.get('currencyOne') as FormControl;
  }
  get currencyTwo(): FormControl {
    return this.currencyForm.get('currencyTwo') as FormControl;
  }
  get amountOne(): FormControl {
    return this.currencyForm.get('amountOne') as FormControl;
  }
  get amountTwo(): FormControl {
    return this.currencyForm.get('amountTwo') as FormControl;
  }
}
