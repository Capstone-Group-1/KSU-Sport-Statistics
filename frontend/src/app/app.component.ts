import {Component, OnInit} from '@angular/core';
import {ExampleApiService} from './services/example-api.service';
import {Example} from './models/example-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  exampleList: Example[];

  constructor(private exampleApi: ExampleApiService) {
  }

  ngOnInit() {
    this.exampleApi
      .getExamples()
      .subscribe(res => {
          this.exampleList = res;
        },
        console.error
      );
  }
}