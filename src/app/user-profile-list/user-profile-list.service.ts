import {Injectable} from '@angular/core';
import {ApiService} from "../common/services/api.service";
import {Profile} from "../common/domain-models/profile";
import {BehaviorSubject, distinctUntilChanged, Observable, switchMap} from "rxjs";
import { HttpParams } from '@angular/common/http';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

interface RequestFetchAllProfilesArgs {
  limit: number;
  skip: number;
}

interface RequestFetchAllProfilesResult {
  limit: number;
  skip: number;
  total: number;
  users: Profile[];
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileListService {
  pageSize = 10;
  allProfiles = new BehaviorSubject<Profile[]>([]);
  isLoading = new BehaviorSubject(true);
  error = new BehaviorSubject<unknown>(null);
  totalCount = new BehaviorSubject(0);
  currentPage = new BehaviorSubject(1);
  isDeletingSingleProfile = new BehaviorSubject(false)
  isLoadingTail = new BehaviorSubject(false);

  constructor(private apiService: ApiService) {
    this.currentPage.pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(),
      switchMap(() => {
        this.isLoading.next(true)
        return this.loadAllProfiles({
          skip: this.pageSize * (this.currentPage.value - 1),
          limit: this.pageSize,
        })
      })
    ).subscribe({
      next: result => {
        this.allProfiles.next(result.users)
        this.totalCount.next(result.total)
        this.isLoading.next(false)
      },
      error: error => {
        this.error.next(error)
      },
    })
  }

  loadAllProfiles({ skip, limit }: RequestFetchAllProfilesArgs): Observable<RequestFetchAllProfilesResult> {
    return this.apiService.get<RequestFetchAllProfilesResult>('users', new HttpParams({ fromObject: {
        skip,
        limit,
        select: 'firstName,lastName,age,gender,birthDate,email,image'
      }}))
  }

  changePage(page: number): void {
    this.currentPage.next(page)
  }

  fetchPageTail() {
    this.isLoadingTail.next(true)
    this.loadAllProfiles({
      skip: this.pageSize - 1,
      limit: 1,
    })
      .subscribe({
        next: result => {
          this.allProfiles.next([
              ...this.allProfiles.value,
            ...result.users,
          ])
          this.totalCount.next(result.total)
          this.isLoadingTail.next(false)
        },
        error: error => {
          this.error.next(error)
        },
      })
  }

  deleteSingleProfile(targetProfileId: number) {
    if (this.isDeletingSingleProfile.value) {
      return
    }
    this.isDeletingSingleProfile.next(true)
    this.apiService.delete<Profile>(`users/${targetProfileId}`)
      .subscribe({
        next: result => {
          if (!result.id) {
            return;
          }
          const newProfiles = [...this.allProfiles.value].filter(profile => profile.id !== targetProfileId)
          this.allProfiles.next(newProfiles)
          this.isDeletingSingleProfile.next(false)
          this.fetchPageTail()
        },
        error: error => {
          this.error.next(error)
        },
      })
  }
}
