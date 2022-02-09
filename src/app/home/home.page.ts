
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
  indexWord: number;
  indexLetter: number;
  settings: number[];
  board = new Array();
  word = new Array();
  load = false;
  show: boolean = true;

  keyboard: Array<Array<string>> = [['a','z','e','r','t','y','u','i','o','p'],
                                    ['q','s','d','f','g','h','j','k','l','m'],
                                    ['w','x','c','v','b','n','<--','Enter']];

  constructor(public router: Router, public serviceSettings: SettingsService) {
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }
  checkMot(){

  }
  deleteLetter(){
    if(this.indexLetter > 0){
      this.board[this.indexWord][this.indexLetter -1] = '';
      this.indexLetter = this.indexLetter -1;
    }
  }

  addLetter(letter: string){
    console.log("Letter : "+letter);
    if(this.indexLetter < this.board[this.indexWord].length){
      this.board[this.indexWord][this.indexLetter] = letter;
      this.indexLetter = this.indexLetter +1;
      console.log(this.word.toString());
    }
    this.reload();
  }

  ionViewDidEnter(){
    this.loadSettings();
  }

  loadSettings(){
    this.indexWord = 0;
    this.indexLetter = 0;
    this.board = new Array();
    this.word = new Array();
    this.settings = this.serviceSettings.getSettings();
    this.wordLength = this.settings[0];
    this.tries = this.settings[1];
    for(let j = 0;j<this.tries;j++){
      for(let i = 0;i<this.wordLength;i++){
        this.word.push(' ');
      }
      this.board.push(this.word);
      this.word = new Array();
    }
  }

  goToSettings(){
    this.router.navigate(['/settings']);
  }
}
