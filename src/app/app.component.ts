import { Component, OnInit } from '@angular/core';
import { AmountChangeAction } from '../actions/amount';
import { CurrenciesUpdateAction } from '../actions/currency';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Observable } from 'rxjs';
import { Currency } from '../models/currency';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-demo-app';
  public amount$: Observable<number>;
  public currencyRates$: Observable<Currency[]>;

  constructor(public store: Store<fromRoot.State>) {
    this.amount$ = store.select(fromRoot.getAmountState);
    this.currencyRates$ = store.select(fromRoot.getCurrnecyRates);
  }

  // Dispatch the Action
  ngOnInit() {
    this.store.dispatch(new CurrenciesUpdateAction());
  }

  onAmountChange(amount: string) {
    const number1 = parseFloat(amount);
    if (!isNaN(number1)) {
      this.store.dispatch(new AmountChangeAction(number1));
    }
  }
}
