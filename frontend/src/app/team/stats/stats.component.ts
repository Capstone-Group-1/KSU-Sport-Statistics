import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Stat } from "../../models/stat";
import * as fromStore from '../../reducers/index';
import * as Index from "../../reducers/index";

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy {

  statArrays: object = {};
  options: string[] = [];
  option: string = "";
  formattedStats: Stat[] = [];

  constructor(private store: Store<Index.State>) {
  }

  subscriptions = [];

  ngOnInit() {
    const statsSubscription = this.store.pipe(select(fromStore.getTeamStats))
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
        this.updateStats(this.options[0]);
      });

    this.subscriptions = [statsSubscription]
  }

  updateStats(option) {
    this.formattedStats = [];
    let stats = option == "Overall" ? this.statArrays[option] : this.statArrays[option][1];
    if (Array.isArray(stats)) {
      let totalStats = {};
      let individualAttributes = ["jerseyNo", "gamesStarted", "gamesPlayed"];
      for (let [name, data] of Object.entries(stats[0])) {
        if (!individualAttributes.includes(name)) {
          totalStats[name] = stats.reduce((total, x) => total + x[name], 0);
          totalStats[name] = Math.round(totalStats[name] * 100) / 100;
        }
      }
      stats = totalStats;
    }
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