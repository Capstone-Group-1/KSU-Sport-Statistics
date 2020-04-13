import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  constructor(private api: ApiService) { }

  statsForm = new FormControl();
  statOptions = [];
  stats = [];
  test: any = null;

  public chartType: string = 'line';
  public chartDatasets: Array<any> = [];
  public chartLabels: Array<any> = [];
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true,
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  subscriptions = [];

  ngOnInit() {
    //   this.api.getProgressStatLabels().
    //   subscribe(res => {
    //     this.statOptions = res;
    //   },
    //   console.error
    // );
    this.statOptions = ["fieldGoalsMade", "fieldGoalAttempts"];
  }

  async setupChart() {
    let chartData = [];
    for (let stat of this.stats) {
      let progressData = await this.getProgressData(stat);
      this.chartLabels = progressData.map(x => x.date)
      chartData.push({
        data: progressData.map(x => x.stat),
        label: stat
      });
    }
    this.chartDatasets = chartData;
  }

  async getProgressData(stat: string) {
    let resData = await this.api.getProgressStat(stat);
    return resData;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
