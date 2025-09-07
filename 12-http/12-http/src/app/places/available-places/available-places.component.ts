import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import {Place} from '../place.model';
import {PlacesComponent} from '../places.component';
import {PlacesContainerComponent} from '../places-container/places-container.component';
import {HttpClient} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";
import {PlacesService} from "../places.service";

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  destroyRef = inject(DestroyRef)
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false)
  errorMessage = signal('')
  placeService = inject(PlacesService)

  ngOnInit(): void {
    this.isFetching.set(true)
    const subscribe = this.placeService.loadAvailablePlaces().subscribe({
      next: (data) => {
        this.places.set(data)
      },
      complete: () => {
        this.isFetching.set(false)
      },
      error: (err) => {
        this.errorMessage.set(err.message)
      }
    })
    this.destroyRef.onDestroy(() => subscribe.unsubscribe())
  }

  onSelectPlace(place: Place) {
    const subscribe = this.placeService.addPlaceToUserPlaces(place).subscribe({
      next: (data) => {
        console.log(data)
      }
    })
    this.destroyRef.onDestroy(() => subscribe.unsubscribe())
  }
}
