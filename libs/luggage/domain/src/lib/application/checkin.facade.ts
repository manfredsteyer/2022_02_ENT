import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Passenger } from '../entities/passenger';
import { PassengerDataService } from '../infrastructure/passenger.data.service';

@Injectable({ providedIn: 'root' })
export class CheckinFacade {
  private passengerListSubject = new BehaviorSubject<Passenger[]>([]);
  passengerList$ = this.passengerListSubject.asObservable();

  constructor(private passengerDataService: PassengerDataService) {}

  load(): void {
    this.passengerDataService.load().subscribe({
      next: (passengerList) => {
        this.passengerListSubject.next(passengerList);
      },
      error: (err) => {
        console.error('err', err);
      },
    });
  }
}
