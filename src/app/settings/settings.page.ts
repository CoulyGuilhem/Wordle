import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {HomePage} from '../home/home.page';
import { Router } from '@angular/router';
import {SettingsService} from '../settings.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  homePage: HomePage;
  wordLength: number;
  tries: number;
  valueLength;
  valueTries;
  erreur = '';

  constructor(public router: Router, private settingService: SettingsService) {

  }

  ngOnInit() {
  }

  setLength(){
    this.wordLength = this.valueLength;
  }

  setTries(){
    this.tries = this.valueTries;
  }

  startGame() {
    this.settingService.setService(this.wordLength,this.tries);
    if(this.valueTries != null && this.valueLength != null){
      this.router.navigate(['/home']);
    } else {
      this.erreur = 'Veuillez choisir toutes les valeurs';
    }
  }

}
