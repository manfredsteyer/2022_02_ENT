import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';
import { FlightBookingAppStateSlice, flightBookingFeatureKey } from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.FlightBookingState>(
  fromFlightBooking.flightBookingFeatureKey
);

export const selectAllFlights = createSelector(
  selectFlightBookingState,
  fbs => fbs.flights
);

export const selectFilter = createSelector(
  selectFlightBookingState,
  fbs => fbs.hiddenFlights
);

export const selectFlights3 = createSelector(
  selectAllFlights,
  selectFilter,
  (flights, hidden) => flights.filter(f => !hidden.includes(f.id))
);

export const selectFlights = 
  (root: FlightBookingAppStateSlice) => root[flightBookingFeatureKey].flights;


// ViewModel  
export const selectFlights2 = createSelector(
  (root: FlightBookingAppStateSlice) => root[flightBookingFeatureKey].flights,
  (root: FlightBookingAppStateSlice) => root[flightBookingFeatureKey].hiddenFlights,
  (flights, hidden) => flights.filter(f => !hidden.includes(f.id))
);

// EcmaScript 2016: array.includes, 2 ** 3