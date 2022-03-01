import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// RxJS 7
import { 
    combineLatest, 
    interval, 
    Observable, 
    ReplaySubject,
    debounceTime, 
    distinctUntilChanged, 
    filter, 
    map, 
    share, 
    shareReplay, 
    startWith, 
    switchMap, 
    tap, 
    withLatestFrom,
    delay,
    mergeMap,
    concatMap,
    exhaustMap,
    catchError,
    of,
    take,
    Subject,
    takeUntil
} from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
// import { debounceTime, distinctUntilChanged, filter, map, share, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Flight } from '@flight-workspace/flight-lib';

@Component({
    selector: 'flight-lookahead',
    templateUrl: './flight-lookahead.component.html'
})
export class FlightLookaheadComponent implements OnInit, OnDestroy {


    close$ = new Subject<void>();

    constructor(private http: HttpClient) {
    }



    // TODO: remove one of them! 
    // online = false;
    online$!: Observable<boolean>;

    control!: FormControl;
    flights$!: Observable<Flight[]>;
    loading = false;

    ngOnInit() {
        this.control = new FormControl();

        // RxJs == Angular 13
        this.online$ = interval(2000).pipe(
            startWith(-1),
            tap(cnt => console.log('cnt', cnt)),
            map(_ => Math.random() < 0.5), // t, t, t, f, f, t
            map(_ => true),
            distinctUntilChanged(), // t, f, t
            share({
                connector: () => new ReplaySubject(1),
                resetOnRefCountZero: true,
            })
            // shareReplay({ bufferSize: 1, refCount: true })
            // tap(value => this.online = value)
        );



        const input$ = this.control.valueChanges.pipe(
            filter(str => str.length >= 3),
            debounceTime(300),
        );

        // RxJS 7 --> ng 13
        this.flights$ = combineLatest({ input: input$, online: this.online$}).pipe(
            filter( t => t.online),
            map(t => t.input),
            tap(() => this.loading = true),
            switchMap(name => this.load(name)),
            tap(() => this.loading = false)
        );

        const sub = this.flights$.pipe(takeUntil(this.close$)).subscribe(x => console.log('x', x));
        // sub.unsubscribe();
        // this.flights$ = input$.pipe(
        //     withLatestFrom(this.online$),
        //     filter( ([v, o]) => o),
        //     map(([v, o]) => v),
        //     tap(() => this.loading = true),
        //     switchMap(name => this.load(name)),
        //     tap(() => this.loading = false)
        // );

    }
    
    ngOnDestroy(): void {
        this.close$.next();
    }

    load(from: string)  {
        const url = "http://www.angular.at/api/flight";

        const params = new HttpParams()
                            .set('from', from);

        const headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        return this.http.get<Flight[]>(url, {params, headers}).pipe(
            catchError(err => {
                console.error('err', err);
                return of([]);
            })
        );
    };


}
