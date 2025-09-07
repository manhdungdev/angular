import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import {PlacesContainerComponent} from '../places-container/places-container.component';
import {PlacesComponent} from '../places.component';
import {Place} from "../place.model";
import {HttpClient} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";
import {PlacesService} from "../places.service";

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  destroyRef = inject(DestroyRef)
  isFetching = signal(false)
  errorMessage = signal('')
  placeService = inject(PlacesService)
  places = this.placeService.loadedUserPlaces

  ngOnInit(): void {
    this.isFetching.set(true)
    const subscribe = this.placeService.loadUserPlaces()
      .subscribe({
        complete: () => {
          this.isFetching.set(false)
        },
        error: (err) => {
          this.errorMessage.set(err.message)
        }
      })
    this.destroyRef.onDestroy(() => subscribe.unsubscribe())
  }

  onRemovePlace(place: Place) {
    const subscribe = this.placeService.removeUserPlace(place).subscribe()
    this.destroyRef.onDestroy(() => subscribe.unsubscribe())
  }
}
