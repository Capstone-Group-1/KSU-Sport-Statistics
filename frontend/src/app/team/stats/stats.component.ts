import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Stat } from "../../models/Stat";
import * as fromStore from '../../reducers/index';
import * as Index from "../../reducers/index";
import { getCurrentTeamStats } from 'src/app/actions/app.action';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy{

  formattedStats: Stat[] = [];

  constructor(private store: Store<Index.State>) {
   }

   subscriptions = [];

   ngOnInit() {
     this.store.dispatch(getCurrentTeamStats());
     const statsSubscription = this.store.pipe(select(fromStore.getTeamStats))
       .subscribe((stats: Stat[]) => {
         this.formattedStats = [];
         for (let [name, data] of Object.entries(stats)) {
          this.formattedStats.push(new Stat(name, data));
        }
       });
 
       this.subscriptions = [statsSubscription]
   }

   ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}