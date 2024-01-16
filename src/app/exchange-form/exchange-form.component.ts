import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AppService } from 'src/app.service';

@Component({
  selector: 'app-exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.scss'],
})
export class ExchangeFormComponent {
  firstValue: any;
  secondValue: any;
  firstValueRate: any;
  secondValueRate: any;
  data: any;
  event: string = '';

  currencyForm = this.fb.group({
    currencyOne: [''],
    currencyTwo: [''],
    amountOne: [''],
    amountTwo: [''],
  });

  constructor(private appService: AppService, private fb: FormBuilder) {}

  ngOnInit() {
    this.appService.getData().subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.callBoth();
  }

  callBoth() {
    this.recalculateFirstValue();
    this.recalculateSecondValue();
  }

  recalculateFirstValue() {
    this.currencyOne.valueChanges.subscribe((value) => {
      this.firstValue = value;
      this.firstValueRate = value;
    });
  }

  recalculateSecondValue() {
    this.currencyTwo.valueChanges.subscribe((value) => {
      this.secondValue = value;
      this.secondValueRate = value;
    });
  }
  handleChangeFirstValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.secondValue =
      (Number(this.firstValueRate) * Number(value)) /
      Number(this.secondValueRate);
  }

  handleChangeSecondValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.firstValue =
      (Number(this.secondValueRate) * Number(value)) /
      Number(this.firstValueRate);
  }

  get currencyOne(): FormControl {
    return this.currencyForm.get('currencyOne') as FormControl;
  }
  get currencyTwo(): FormControl {
    return this.currencyForm.get('currencyTwo') as FormControl;
  }
}
