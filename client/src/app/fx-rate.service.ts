import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FxRate} from './fx-rate';

@Injectable({
  providedIn: 'root'
})
export class FxRateService {

  private URL_CURRENT_FX_RATES = 'http://localhost:8080/FxRate/CurrentFxRates';
  private URL_FX_RATES_FOR_CURRENCY = 'http://localhost:8080/FxRate/FxRatesForCurrency';
  public currentFxRates: FxRate[];
  public fxRatesForCurrency: FxRate[];

  constructor(private http: HttpClient) { }

  public getCurrentFxRates(): Observable<FxRate[]> {
    return this.http.get<FxRate[]>(this.URL_CURRENT_FX_RATES);
  }

  public getFxRatesForCurrency(targetCurrency: string): Observable<FxRate[]> {
    return this.http.get<FxRate[]>(this.URL_FX_RATES_FOR_CURRENCY + '?' + new HttpParams().set('currency', targetCurrency));
  }
}
