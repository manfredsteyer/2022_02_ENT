/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {Component, OnInit} from '@angular/core';
import { FlightService } from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { loadFlights, loadFlightsSuccess, updateFlight } from '../+state/flight-booking.actions';
import { FlightBookingAppStateSlice, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { selectFlights, selectFlights2, selectFlights3 } from '../+state/flight-booking.selectors';
//import {FlightService} from '@flight-workspace/flight-lib';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  flights$ = this.store.select(selectFlights3);

  constructor(
    private flightService: FlightService,
    private store: Store) {
  }

  ngOnInit() {
  }

  search(): void {
    if (!this.from || !this.to) return;
    this.store.dispatch(loadFlights({from: this.from, to: this.to}));
  }

  delay(): void {
    // this.flightService.delay();
    this.flights$.pipe(take(1)).subscribe(flights => {
      const flight = {...flights[0], date: new Date().toISOString() };
      this.store.dispatch(updateFlight({ flight }));
    });

  }

}
