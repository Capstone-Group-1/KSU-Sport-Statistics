import { Component, OnInit, OnDestroy } from '@angular/core';
import { Roster } from 'src/app/models/roster';
import { Subject } from 'rxjs';
import { Store, select } from "@ngrx/store";
import * as fromStore from "../../../reducers/index";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromStore.State>) { }

  action: Subject<any> = new Subject();
  player: Roster = new Roster();
  team: string = "";

  value: string = "Info";
  options = [
    { value: "Info", active: true },
    { value: "Stats", active: false },
  ];

  subscriptions = [];

  ngOnInit() {
    const teamSubscription = this.store.pipe(select(fromStore.getCurrentTeam))
      .subscribe((team: string) => {
        this.team = this.setTeam(team);
      });
    const playerSubscription = this.store.pipe(select(fromStore.getPlayer))
      .subscribe((player: Roster) => {
        this.player = player;
      });

      this.subscriptions = [playerSubscription, teamSubscription]
  }

  setActiveTab(value: string) {
    this.value = value;
    this.options.find(o => o.active).active = false;
    this.options.find(o => o.value === value).active = true;
  }

  close() {
    this.action.next("close");
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  setTeam(team) {
    let teamAcronym;
    switch (team) {
      case "Mens Basketball": {
        teamAcronym = "mbb";
        break;
      }
      case "Womens Basketball": {
        teamAcronym = "wbb";
        break;
      }
      case "Softball": {
        teamAcronym = "softball";
        break;
      }
      case "Baseball": {
        teamAcronym = "baseball";
        break;
      }
      default: {
        break;
      }
    }
    return teamAcronym;
  }

}
