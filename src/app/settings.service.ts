import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private wordLength: number;
  private tries: number;

  constructor() {
  }

  setService(sWordLength: number, sTries: number){
    this.wordLength = sWordLength;
    this.tries = sTries;
  }

  getSettings(){
    return([this.wordLength,this.tries]);
  }
}
