import {Component, Input, OnInit} from '@angular/core';
import {UserProfileDetailsService} from "./user-profile-details.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-user-profile-details',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './user-profile-details.component.html',
  styleUrl: './user-profile-details.component.css'
})
export class UserProfileDetailsComponent implements OnInit{

  constructor(protected userProfileDetails: UserProfileDetailsService) {
  }

  @Input() profileId = '';
  ngOnInit(): void {
    if (this.profileId) {
      this.userProfileDetails.loadProfileDetails({ profileId: Number(this.profileId) })
    }
  }

}
