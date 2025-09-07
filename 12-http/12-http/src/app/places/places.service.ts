import {inject, Injectable, signal} from '@angular/core';

import {Place} from './place.model';
import {catchError, map, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "../shared/shared/error.service";

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient)
  private userPlaces = signal<Place[]>([]);
  private errorService = inject(ErrorService)

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchDate('http://localhost:3000/places', 'Something went wrong. Please try again')
  }

  loadUserPlaces() {
    return this.fetchDate('http://localhost:3000/user-places', 'Something went wrong. Please try again')
      .pipe(tap((data) => {
        this.userPlaces.set(data)
      }))
  }

  addPlaceToUserPlaces(place: Place) {
    const prevState = this.userPlaces()
    if (!prevState.some(value => value.id === place.id)) {
      this.userPlaces.update(prev => [...prev, place])
    }
    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id
    }).pipe(catchError((err) => {
      this.userPlaces.set(prevState)
      this.errorService.showError('Failed to store favourite')
      return throwError('Failed to store favourite')
    }))
  }

  removeUserPlace(place: Place) {
    const prevState = this.userPlaces()
    if (prevState.some(value => value.id === place.id)) {
      this.userPlaces.set(prevState.filter(value => value.id !== place.id))
    }

    return this.httpClient.delete('http://localhost:3000/user-places/' + place.id)
      .pipe(catchError((err) => {
        this.userPlaces.set(prevState)
        this.errorService.showError('Failed to remove favourite')
        return throwError('Failed to store favourite')
      }))

  }

  private fetchDate(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url)
      .pipe(map(data => data.places),
        catchError(error => throwError(() => new Error(errorMessage))))
  }
}
