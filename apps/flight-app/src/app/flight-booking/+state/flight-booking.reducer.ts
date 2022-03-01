import { Flight } from '@flight-workspace/flight-lib';
import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';


export interface FlightBookingAppStateSlice {
  [flightBookingFeatureKey]: FlightBookingState;
}

export interface FlightBookingState {
  flights: Flight[];
  hiddenFlights: number[];
  basket: object;
  stats: object;
}

export const initialState: FlightBookingState = {
  flights: [],
  hiddenFlights: [4],
  basket: {},
  stats: {}
};

export const reducer = createReducer(
  initialState,

  // on(FlightBookingActions.loadFlights, state => state),
  on(FlightBookingActions.loadFlightsSuccess, (state, action) => {
    const flights = action.flights;
    return { ...state, flights };
  }),

  on(FlightBookingActions.updateFlight, (state, action) => {
    const flight = action.flight;
    const flights = state.flights.map(f => f.id === flight.id ? flight : f );
    return { ...state, flights };
  }),

  // on(FlightBookingActions.loadFlightsFailure, (state, action) => state),

);
