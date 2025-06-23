import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService<I> {

  constructor(private http: HttpClient) {}

  getAll<I>(url: string): Observable<I[]> {
    return this.http.get<I[]>(url).pipe(delay(1500));
  }
}
