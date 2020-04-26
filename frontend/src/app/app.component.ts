import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Store, select } from "@ngrx/store";
import * as fromStore from "../app/reducers/index";
import { updateCurrentTeam } from '../app/actions/app.action';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  
  constructor(private store: Store<fromStore.State>, private router: Router) {
  }

  myControl = new FormControl();
  
  public sports = [
    {
      name:"Mens Basketball",
      icon:"basketball-ball"
    },
    {
      name:"Womens Basketball",
      icon:"basketball-ball"
    },
    {
      name:"Softball",
      icon:"baseball-ball"
    },
    {
      name:"Baseball",
      icon:"baseball-ball"
    }
  ];

  team: string = "";

  public searchOptions = ["Mens Basketball", "Womens Basketball", "Softball", "Baseball"];

  filteredOptions: Observable<string[]>;

  public title = "KSU Sports Statistics";

  subscriptions = [];

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    const teamSubscription = this.store.pipe(select(fromStore.getCurrentTeam))
      .subscribe((team: string) => {
        this.team = team;
      });

    

    this.subscriptions = [teamSubscription]
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.searchOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  updateCurrentTeam(team) {
    //this.sidenav.close();
    setTimeout(() => {this.sidenav.close();}, 200);
    if (team !== "") {
      this.store.dispatch(updateCurrentTeam({ team: team }));
      this.router.navigateByUrl('/team');
    }
  }
}