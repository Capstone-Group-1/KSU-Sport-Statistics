import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Stat } from "../../../../models/stat";
import * as fromStore from '../../../../reducers/index';
import * as Index from "../../../../reducers/index";

@Component({
  selector: 'player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit, OnDestroy {

  statArrays: object = {};
  options: string[] = [];
  option: string = "";
  formattedStats: Stat[] = [];

  constructor(private store: Store<Index.State>) {
  }

  subscriptions = [];

  ngOnInit() {
    const statsSubscription = this.store.pipe(select(fromStore.getPlayerStats))
      .subscribe((statArrays: any[]) => {
        this.statArrays = {};
        if (!(Array.isArray(statArrays))) {
          this.statArrays["Overall"] = statArrays;
        } else {
          statArrays.forEach(statArray => {
            this.statArrays[Object.keys(statArray)[0]] = Object.entries(statArray)[0];
          });
        }
        this.options = Object.keys(this.statArrays);
        this.options = this.options.filter(x => this.statArrays[x][1] != "");
        this.updateStats(this.options[0]);
      });

    this.subscriptions = [statsSubscription]
  }

  updateStats(option) {
    this.formattedStats = [];
    let stats = option == "Overall" ? this.statArrays[option] : this.statArrays[option][1];
    for (let [name, data] of Object.entries(stats)) {
      let formattedName = name.replace(/([A-Z])/g, ' $1').trim();
      formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
      this.formattedStats.push(new Stat(formattedName, data));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
