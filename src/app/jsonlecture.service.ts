import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JSONLectureService {

  constructor(private http: HttpClient) { }

  private URL: string = "http://alixgoguey.fr/words/wordapi.php"

  public getMotAleatoire(taille): Observable<any> {
    let requeteRandom = 'cmd=rand';
    let requeteTaille = "size=" + taille;
    let requete = this.URL + "?" + requeteRandom + "&" + requeteTaille;
    return this.http.get(requete);
  }

  public verifieExistenceMot(mot): Observable<any> {
    let requeteExist = "cmd=exists";
    let requeteMot = "word=" + mot;
    let requete = this.URL + "?" + requeteExist + "&" + requeteMot;
    return this.http.get(requete);
  }
}
