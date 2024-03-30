import { Routes } from '@angular/router';

import {NewUserProfileComponent} from "./new-user-profile/new-user-profile.component";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'user-profiles',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./user-profile-list/user-profile-list.component')
            .then(m => m.UserProfileListComponent),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./new-user-profile/new-user-profile.component')
            .then(m => NewUserProfileComponent),
      },
      {
        path: 'edit/:profileId',
        loadComponent: () =>
          import('./edit-user-profile/edit-user-profile.component')
            .then(m => m.EditUserProfileComponent),
      },
      {
        path: 'view/:profileId',
        loadComponent: () =>
          import('./user-profile-details/user-profile-details.component')
            .then(m => m.UserProfileDetailsComponent),
      },
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
