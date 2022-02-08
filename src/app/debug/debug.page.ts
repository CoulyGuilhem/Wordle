import { Component, OnInit } from '@angular/core';
import { JSONLectureService } from '../jsonlecture.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.page.html',
  styleUrls: ['./debug.page.scss'],
})
export class DebugPage implements OnInit {

  private motGenere: string;
  private taille: number;
  private motExiste: boolean;

  constructor(private session: JSONLectureService) {
    this.taille = 5
    this.getMotGenere(this.taille).subscribe(data => {
      if (data.ok === true) {
        this.motGenere = data.word;
      }
    });
    this.motExiste = false;
  }

  ngOnInit() {

  }

  public getMotGenere(taille) {
    let motGenereAPI = this.session.getMotAleatoire(taille);
    return motGenereAPI;
  }

  public verifieMot() {
    let element = document.getElementById("entree");
    let balise = element.lastChild;
    let mot = balise['value'];
    let verifMotAPI = this.session.verifieExistenceMot(mot).subscribe(data => {
      if (data.ok === true && data.exists === true) {
        this.motExiste = true;
      }
    });
    return verifMotAPI;
  }
}
