import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Stat } from "../../models/stat";
import * as fromStore from '../../reducers/index';
import * as Index from "../../reducers/index";
import { getCurrentTeamStats } from 'src/app/actions/app.action';
import { FormBuilder, FormGroup } from '@angular/forms';
import { withLatestFrom } from 'rxjs/operators';

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
    console.log(stats);
    for (let [name, data] of Object.entries(stats)) {
      this.formattedStats.push(new Stat(name, data));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}