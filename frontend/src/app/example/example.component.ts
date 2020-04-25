import { Component, OnInit } from '@angular/core';
import { Example } from '../models/example-model';
import { Store, select } from '@ngrx/store';
import * as fromStore from "../reducers/index";
import * as Index from "../reducers/index";

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  title = 'Example';
  
  constructor(private store: Store<Index.State>) {
  }

  examples: Example[] = [];

  ngOnInit() {
    this.store.pipe(select(fromStore.getExamples))
      .subscribe((examples: Example[]) => {
        this.examples = examples;
      });
  }
}
