import { Component, OnInit, Input } from '@angular/core';
import { Roster } from 'src/app/models/roster';

@Component({
  selector: 'player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit {

  constructor() { }

  @Input() roster: Roster;

  rosterProperties = [];

  ngOnInit() {
    if (this.roster) {
      this.rosterProperties = [
        { label: "Jersey Number", value: this.roster.jerseyNum },
        { label: "Year", value: this.roster.playerYear },
        { label: "Height", value: this.roster.playerHeight },
        { label: "Position", value: this.roster.position },
        { label: "Hometown", value: this.roster.hometown },
        { label: "High School", value: this.roster.highSchool },
      ];
    }
  }

}
