import { Component, OnInit } from "@angular/core";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  
  constructor() {
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

  public searchOptions = ["Mens Basketball", "Womens Basketball", "Softball", "Baseball"];

  filteredOptions: Observable<string[]>;

  public title = "KSU Sports Statistics";

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.searchOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}