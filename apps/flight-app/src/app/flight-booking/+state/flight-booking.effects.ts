import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as FlightBookingActions from './flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-lib';
import { loadFlights, loadFlightsSuccess } from './flight-booking.actions';

@Injectable()
export class FlightBookingEffects {

  loadFlightBookings$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(loadFlights),
      switchMap(a => this.flightService.find(a.from, a.to)),
      map(flights => loadFlightsSuccess({flights}))
    );
  });

  constructor(private flightService: FlightService, private actions$: Actions) {}

}
