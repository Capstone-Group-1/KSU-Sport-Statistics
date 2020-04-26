import { Component, OnInit, OnDestroy } from '@angular/core';
import { Roster } from 'src/app/models/roster';
import { Store, select } from "@ngrx/store";
import * as fromStore from "../../../../reducers/index";

@Component({
  selector: 'player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromStore.State>) { }

  player: Roster = null;
  rosterProperties = [];

  subscriptions = [];

  ngOnInit() {

    const playerSubscription = this.store.pipe(select(fromStore.getPlayer))
      .subscribe((player: Roster) => {
        this.player = player;

        if (this.player) {
          this.rosterProperties = [
            { label: "Jersey Number", value: this.player.jerseyNo },
            { label: "Year", value: this.player.playerYear },
            { label: "Height", value: this.player.playerHeight },
            { label: "Position", value: this.player.position },
            { label: "Hometown", value: this.player.hometown },
            { label: "High School", value: this.player.highSchool },
          ];
        }
      });

    this.subscriptions = [playerSubscription];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
