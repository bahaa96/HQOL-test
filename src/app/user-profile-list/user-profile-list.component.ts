import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-profile-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-profile-list.component.html',
  styleUrl: './user-profile-list.component.css'
})
export class UserProfileListComponent {

}
