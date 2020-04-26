import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl } from '@angular/forms';
import { Progress } from 'src/app/models/progress';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  constructor(private api: ApiService) { }

  statsForm = new FormControl();
  statOptions = null;
  statLabels = [];
  stats = [];

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
      this.api.getProgressStatLabels().
      subscribe(res => {
        this.statOptions = res.reduce((a,x) => ({...a, [Object.values(x)[1]]: Object.values(x)[0]}), {});
        this.statLabels = res.map(x => Object.values(x)[1]);
        
      },
      console.error
    );
  }

  async setupChart() {
    let chartData = [];
    for (let stat of this.stats) {
      let progressData = await this.getProgressData(this.statOptions[stat]);
      if (stat == "Outcome") {
        progressData = this.calculateWinLossPercentage(progressData);
      }
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

  calculateWinLossPercentage(outcomes: Progress[]) {
    let outcomeArray = [];
    let outcomePercentages = [];
    outcomes.forEach(outcome => {
      let win = outcome.stat.toString() == "W" ? 1 : 0;
      outcomeArray.push(win);
      outcomePercentages.push(new Progress(outcome.date, outcomeArray.reduce( ( p, c ) => p + c, 0 ) / outcomeArray.length));
    });
    return outcomePercentages;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
