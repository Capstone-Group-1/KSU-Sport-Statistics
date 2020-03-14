import { Component, OnInit } from '@angular/core';
import { ServerStreamFileResponseOptionsWithError } from 'http2';
import { Roster } from 'src/app/models/roster';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor() { }

  roster: Roster;
  action: Subject<any> = new Subject();

  value: string = "Info";
  options = [
    { value: "Info", active: true },
    { value: "Stats", active: false },
  ];

  ngOnInit() {
  }

  setActiveTab(value: string) {
    this.value = value;
    this.options.find(o => o.active).active = false;
    this.options.find(o => o.value === value).active = true;
  }

  close() {
    this.action.next("close");
  }

}
