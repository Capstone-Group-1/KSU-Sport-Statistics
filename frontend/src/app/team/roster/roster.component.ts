import { Component, OnInit } from '@angular/core';
import { Roster } from 'src/app/models/roster';

@Component({
  selector: 'roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {

  rosters: Roster[] = [];

  constructor() {}

  ngOnInit() {
  }

}
