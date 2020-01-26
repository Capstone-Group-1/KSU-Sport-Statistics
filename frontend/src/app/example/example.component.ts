import { Component, OnInit } from '@angular/core';
import { Example } from '../models/example-model';
import { ExampleApiService } from '../services/example-api.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  title = 'Example';
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
