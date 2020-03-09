import { Component, OnInit, OnDestroy } from '@angular/core';
import { Roster } from 'src/app/models/roster';
import { Store, select } from "@ngrx/store";
import * as fromStore from "../../reducers/index";

@Component({
  selector: 'roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit, OnDestroy {

  rosters: Roster[] = [];

  constructor(private store: Store<fromStore.State>) {}

  subscriptions = [];

  ngOnInit() {
    const rostersSubscription = this.store.pipe(select(fromStore.getRosters))
      .subscribe((rosters: Roster[]) => {
        this.rosters = rosters;
      });

      this.subscriptions = [rostersSubscription]
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  showPlayerStats(roster: Roster) {
    console.log(roster);
  }

}
