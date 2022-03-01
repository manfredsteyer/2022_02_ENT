import { Flight } from '@flight-workspace/flight-lib';
import { createAction, props } from '@ngrx/store';

export const loadFlights = createAction(
  '[FlightBooking] Load Flights',
  props<{from: string, to: string}>()
);



export const loadFlightsSuccess = createAction(
  '[FlightBooking] Load Flights Success',
  props<{ flights: Flight[] }>()
);

export const updateFlight = createAction(
  '[FlightBooking] updateFlight',
  props<{ flight: Flight }>()
);


// export const loadFlightsFailure = createAction(
//   '[FlightBooking] Load Flights Failure',
//   props<{ error: string }>()
// );
