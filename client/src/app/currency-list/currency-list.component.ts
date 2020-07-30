import { Component, OnInit } from '@angular/core';
import {FxRate} from '../fx-rate';
import {FxRateService} from '../fx-rate.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {

  public currentFxRates: FxRate[];
  public fxRatesForCurrency: FxRate[];

  constructor(private fxRateService: FxRateService) { }

  ngOnInit(): void {
    this.fxRateService.getCurrentFxRates().subscribe(data => {
      this.currentFxRates = data;
      this.fxRateService.currentFxRates = data;
    });
  }
}
