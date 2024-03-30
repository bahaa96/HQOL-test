import { Injectable } from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, Observable, switchMap} from "rxjs";
import {Profile} from "../common/domain-models/profile";
import {ApiService} from "../common/services/api.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

interface RequestFetchSingleProfilesArgs {
  profileId: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileDetailsService {
  profileDetails = new BehaviorSubject<Profile | null>(null);
  isLoading = new BehaviorSubject(true);
  error = new BehaviorSubject<unknown>(null);

  profileDetails$ = this.profileDetails.asObservable()

  constructor(private apiService: ApiService) {
  }

  loadProfileDetails({ profileId }: RequestFetchSingleProfilesArgs): void {
    this.isLoading.next(true)
    this.apiService.get<Profile>(`users/${profileId}`)
      .subscribe({
        next: result => {
          this.profileDetails.next(result)
          this.isLoading.next(false)
        },
        error: error => {
      this.error.next(error)
    },
      })
  }
}
