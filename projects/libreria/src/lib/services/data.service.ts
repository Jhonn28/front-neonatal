import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  _currentPassword: string;

  constructor() { }

  //TODO: SETTERS
  set currentPassword(value: string) {
    this._currentPassword = value;
  }

  //TODO: GETTERS
  get currentPassword(): string {
    return this._currentPassword;
  }

}
