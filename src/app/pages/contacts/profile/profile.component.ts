import { Component, OnInit } from '@angular/core';

import { ChartType } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * Contacts-profile component
 */
export class ProfileComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];

    // fetches the data
  }

  /**
   * Fetches the data
   */

}