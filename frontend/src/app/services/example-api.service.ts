import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {API_URL} from '../env';
import { Example } from '../models/example-model';

@Injectable()
export class ExampleApiService {

  constructor(private http: HttpClient) {
  }

  // GET list of examples
  getExamples(): Observable<Example[]> {
    return this.http
      .get<Example[]>(`${API_URL}/examples`).pipe(
        map(data => {
          return data;
        }),
        catchError(error => {
          return throwError(error);
        })
      )
  }
}