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

  value: string = "Info";
  options = [
    { value: "Info", active: true },
    { value: "Stats", active: false },
  ];

  subscriptions = [];

  ngOnInit() {
    const playerSubscription = this.store.pipe(select(fromStore.getPlayer))
      .subscribe((player: Roster) => {
        this.player = player;
      });

      this.subscriptions = [playerSubscription]
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

}
