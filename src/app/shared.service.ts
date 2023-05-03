import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private myVariable = new BehaviorSubject<string>('');

  constructor() { }

  setVariable(value: string) {
    this.myVariable.next(value);
  }

  getVariable() {
    return this.myVariable.asObservable();
  }
}
