import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserProfileListService} from "./user-profile-list.service";
import {AsyncPipe, NgIf, NgSwitch} from "@angular/common";

@Component({
  selector: 'app-user-profile-list',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgIf,
    NgSwitch,
  ],
  templateUrl: './user-profile-list.component.html',
  styleUrl: './user-profile-list.component.css'
})
export class UserProfileListComponent {

  constructor(protected userProfileListService: UserProfileListService) {
  }

  protected readonly Array = Array;
  protected readonly Math = Math;
  protected readonly Number = Number;
}
