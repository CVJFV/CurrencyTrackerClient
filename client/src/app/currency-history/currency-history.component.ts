import {Component, OnInit, ViewChild} from '@angular/core';
import {FxRateService} from '../fx-rate.service';
import {FormControl} from '@angular/forms';
import {FxRate} from '../fx-rate';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-currency-history',
  templateUrl: './currency-history.component.html',
  styleUrls: ['./currency-history.component.css']
})
export class CurrencyHistoryComponent implements OnInit {
  historyForm = new FormControl('');
  currentFxRates: FxRate[];
  fxRatesForCurrency: FxRate[];

  // Array of data sets from example
  lineChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];
  // Labels shown on the x-axis
  lineChartLabels: Label[] = [];
  // Define chart options
  lineChartOptions: ChartOptions = {
    responsive: true
  };
  // Define colors of chart segments
  lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
    }
  ];
  // Set true to show legends
  lineChartLegend = true;
  // Define type of chart
  lineChartType = 'line';
  lineChartPlugins = [];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private fxRateService: FxRateService) { }

  ngOnInit(): void {
    this.fxRateService.getCurrentFxRates().subscribe(data => {
      this.currentFxRates = data;
      this.historyForm.patchValue(this.currentFxRates[0].targetCurrency);
      this.makeGraph();
    });
  }

  makeGraph(): void {
    this.fxRateService.getFxRatesForCurrency(this.historyForm.value).subscribe(data => {
      this.fxRatesForCurrency = data;
      // Assign empty list to remove old data
      this.lineChartData[0].data = [];
      this.lineChartLabels = [];
      // Create chart data set from result of http get
      this.fxRatesForCurrency.forEach((value, index) => {
        this.lineChartData[0].data.push(value.exchangeRate);
        this.lineChartLabels.push(value.date);
      });
      // Reverse data set so older values are shown first
      this.lineChartData[0].data = this.lineChartData[0].data.reverse();
      this.lineChartLabels = this.lineChartLabels.reverse();
      // Update legend with currency name
      this.lineChartData[0].label = this.historyForm.value;
      // Redraw chart with new data
      this.chart.update();
    });
  }

  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }
}
