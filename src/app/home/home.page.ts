
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';
import { JSONLectureService } from '../jsonlecture.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  wordLength: number;
  tries: number;
  settings: number[];
  board = new Array();
  word = new Array();
  load = false;
  //sert à parcourir le tableau des mots saisis par l'utilisateur
  indexWord: number;

  //attibuts necessaires à la connexion API
  motGenere: string;
  motExiste: boolean;

  constructor(public router: Router, public serviceSettings: SettingsService, private session: JSONLectureService) {
  }

  ionViewDidEnter() {
    this.loadSettings();
    this.getMotGenere(this.wordLength).subscribe(data => {
      if (data.ok === true) {
        this.motGenere = data.word;
      }
    });
    this.motExiste = false;
    this.indexWord = 0;
  }

  loadSettings() {
    this.board = new Array();
    this.word = new Array();
    this.settings = this.serviceSettings.getSettings();
    this.wordLength = this.settings[0];
    this.tries = this.settings[1];
    for (let j = 0; j < this.tries; j++) {
      for (let i = 0; i < this.wordLength; i++) {
        this.word.push(' ');
        console.log(i);
      }
      this.board.push(this.word);
      this.word = new Array();
    }
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  public getMotGenere(taille) {
    let motGenereAPI = this.session.getMotAleatoire(taille);
    return motGenereAPI;
  }

  public verifieMot(mot) {
    this.session.verifieExistenceMot(mot).subscribe(data => {
      if (data.ok === true && data.exists === true) {
        this.motExiste = true;
      } else {
        this.motExiste = false;
      }
    });
  }

  public gagne() {
    //Afficher à l'utilisateur son score
    console.log("gagné");
  }

  public perdu() {
    console.log("perdu");
  }

  public partie() {
    if (this.word[this.indexWord] === this.motGenere) {
      this.gagne();
    } else if (this.indexWord === this.tries - 1) {
      this.perdu();
    } else {
      this.indexWord++;
    }
  }

  public checkMot() {
    console.log("mot de l'utilisateur : " + this.word[this.indexWord]);
    this.verifieMot(this.word[this.indexWord]);
    if (this.motExiste) {
      this.partie();
    }
  }
}
