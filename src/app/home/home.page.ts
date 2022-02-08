
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SettingsService} from '../settings.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{


  wordLength: number;
  tries: number;
  settings: number[];
  board = new Array();
  word = new Array();
  load = false;

  constructor(public router: Router, public serviceSettings: SettingsService) {
  }

  ionViewDidEnter(){
    this.loadSettings();
  }

  loadSettings(){
    this.board = new Array();
    this.word = new Array();
    this.settings = this.serviceSettings.getSettings();
    this.wordLength = this.settings[0];
    this.tries = this.settings[1];
    for(let j = 0;j<this.tries;j++){
      for(let i = 0;i<this.wordLength;i++){
        this.word.push(' ');
        console.log(i);
      }
      this.board.push(this.word);
      this.word = new Array();
    }
  }

  goToSettings(){
    this.router.navigate(['/settings']);
  }
}
