import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SettingsService} from '../settings.service';
import {JSONLectureService} from '../jsonlecture.service';

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
  //attibuts necessaires à la connexion API
  motGenere: string;
  motExiste: boolean;

  keyboard: Array<Array<string>> = [['a','z','e','r','t','y','u','i','o','p'],
                                    ['q','s','d','f','g','h','j','k','l','m'],
                                    ['w','x','c','v','b','n','<--','Enter']];

  constructor(public router: Router, public serviceSettings: SettingsService, private session: JSONLectureService) {
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  deleteLetter(){
    if(this.indexLetter > 0){
      this.board[this.indexWord][this.indexLetter -1] = '';
      this.indexLetter = this.indexLetter -1;
    }
  }

  addLetter(letter: string){
    console.log('Letter : '+letter+" : "+this.board[this.indexWord].length);
    if(this.indexLetter < this.board[this.indexWord].length){
      this.board[this.indexWord][this.indexLetter] = letter;
      this.indexLetter = this.indexLetter +1;
      console.log(this.word.toString());
    }
    this.reload();
  }

  ionViewDidEnter() {
    this.loadSettings();
    this.getMotGenere(this.wordLength).subscribe(data => {
      if (data.ok === true) {
        this.motGenere = data.word;
        console.log(" : "+this.motGenere);
      }
    });
    this.motExiste = false;
    this.indexWord = 0;
    this.indexLetter = 0;
  }

  loadSettings() {
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

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  public getMotGenere(taille) {
    return this.session.getMotAleatoire(taille);
  }

  public verifieMot() {
    this.session.verifieExistenceMot(this.wordString()).subscribe(data => {
      if (data.ok === true && data.exists === true) {
        this.motExiste = true;
        this.partie();
      } else {
        this.motExiste = false;
        console.log("false");
      }
    });
  }

  public gagne() {
    //Afficher à l'utilisateur son score
    console.log('gagné');
  }

  public perdu() {
    console.log('perdu');
  }

  public partie() {
    console.log(this.wordString());
    if (this.wordString() === this.motGenere) {
      this.gagne();
    } else if (this.indexWord === this.tries - 1) {
      this.perdu();
    } else {
      this.indexWord++;
      this.indexLetter = 0;
    }
  }

  public wordString(){
    let wordString = '';
    for(let i = 0;i < this.board[this.indexWord].length ; i++){
      wordString += this.board[this.indexWord][i];
    }
    return wordString;
  }
}
