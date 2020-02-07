import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Index from "../reducers/index";
import { getExamples } from '../actions/home.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<Index.State>) { }


  ngOnInit() {}

  public getExamples() {
    this.store.dispatch(getExamples());
  }

}
