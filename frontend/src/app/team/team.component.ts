import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from "@ngrx/store";
import * as fromStore from "../reducers/index";

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromStore.State>) { }

  value: string = "roster";
  team: string = "";

  options = [
    { value: "roster", active: true },
    { value: "stats", active: false },
    { value: "progress", active: false }
  ];

  subscriptions = [];

  ngOnInit() {
    const teamSubscription = this.store.pipe(select(fromStore.getCurrentTeam))
      .subscribe((team: string) => {
        this.team = team;
      });

      this.subscriptions = [teamSubscription]
  }

  setActiveTab(value: string) {
    this.value = value;
    this.options.find(o => o.active).active = false;
    this.options.find(o => o.value === value).active = true;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
