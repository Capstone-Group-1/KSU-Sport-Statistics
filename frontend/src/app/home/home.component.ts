import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
