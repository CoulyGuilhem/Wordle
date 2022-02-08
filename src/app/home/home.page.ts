import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {SettingsService} from "../settings.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  wordLength: number;
  tries: number;
  settings: number[];
  word = new Array();
  load = false;

  constructor(public router: Router, public serviceSettings: SettingsService) {
  }

  loadSettings(){
    this.settings = this.serviceSettings.getSettings();
    this.wordLength = this.settings[0];
    this.tries = this.settings[1];
    for(let i = 0;i<this.wordLength;i++){
      this.word.push(' ');
      console.log(i);
    }
  }

  goToSettings(){
    this.router.navigate(['/settings']);
  }

}
