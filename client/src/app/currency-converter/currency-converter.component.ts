import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FxRateService} from '../fx-rate.service';
import {FxRate} from '../fx-rate';
import {CURRENCY} from '../currency.enum';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  converterForm = new FormGroup({
    targetCurrencies: new FormControl(''),
    amount: new FormControl('0')
  });
  public currentFxRates: FxRate[];
  amount = 0;
  targetCurrency = CURRENCY.AUD;
  targetAmount = 0;
  exchangeRate: number;

  constructor(private fxRateService: FxRateService) { }

  ngOnInit(): void {
    this.fxRateService.getCurrentFxRates().subscribe(data => {
      this.currentFxRates = data;
      this.targetCurrency = this.currentFxRates[0].targetCurrency;
      this.exchangeRate = this.currentFxRates[0].exchangeRate;
      this.converterForm.controls.targetCurrencies.patchValue(this.currentFxRates[0].targetCurrency);
    });
  }

  calculate(): void {
    this.amount = this.converterForm.getRawValue().amount;
    this.targetCurrency = this.converterForm.controls.targetCurrencies.value;
    this.currentFxRates.forEach((value, index) => {
      if (value.targetCurrency === this.targetCurrency) {
        this.exchangeRate = value.exchangeRate;
      }
    });
    this.targetAmount = this.amount * this.exchangeRate;
  }
}
