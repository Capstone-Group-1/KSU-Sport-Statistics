import { Component, OnInit, OnDestroy } from '@angular/core';
import { Roster } from 'src/app/models/roster';
import { Store, select } from "@ngrx/store";
import * as fromStore from "../../reducers/index";
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { PlayerComponent } from './player/player.component';

@Component({
  selector: 'roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit, OnDestroy {

  rosters: Roster[] = [];
  modalRef: MDBModalRef;

  constructor(private store: Store<fromStore.State>, private modalService: MDBModalService) {}

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
    this.modalRef = this.modalService.show(PlayerComponent, { data: { roster }});
    this.modalRef.content.action.subscribe(() => { this.modalRef.hide() });
  }

}
