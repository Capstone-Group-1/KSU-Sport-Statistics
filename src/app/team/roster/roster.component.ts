import { Component, OnInit } from '@angular/core';
import { Roster } from 'src/app/models/roster';
import { Store, select } from "@ngrx/store";
import * as fromStore from "../../reducers/index";
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { PlayerComponent } from './player/player.component';
import { getPlayer, getPlayerStats } from 'src/app/actions/app.action';

@Component({
  selector: 'roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {

  rosters: Roster[] = [];
  modalRef: MDBModalRef;
  team: string = "";

  constructor(private store: Store<fromStore.State>, private modalService: MDBModalService) {
  }

  subscriptions = [];

  ngOnInit() {
    const teamSubscription = this.store.pipe(select(fromStore.getCurrentTeam))
      .subscribe((team: string) => {
        this.team = this.setTeam(team);
      });
    const rostersSubscription = this.store.pipe(select(fromStore.getRosters))
      .subscribe((rosters: Roster[]) => {
        this.rosters = rosters;
      });

      this.subscriptions = [rostersSubscription, teamSubscription]
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  showPlayerStats(id: number) {
    this.store.dispatch(getPlayer({ id }));
    setTimeout(() => {
      this.store.dispatch(getPlayerStats({ id }));
  }, 100);
    this.modalRef = this.modalService.show(PlayerComponent);
    this.modalRef.content.action.subscribe(() => { this.modalRef.hide() });
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
