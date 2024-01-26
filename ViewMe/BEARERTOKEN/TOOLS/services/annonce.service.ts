import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VariableService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  constructor(private variableService:VariableService,private httpClient: HttpClient) {}
  async get_all_fiche(): Promise<any[]> {
    const url = this.variableService.nom_domaine+'/voiture/fiche_tech';
    try {
      const response: any = await this.httpClient.get(url).toPromise();
      if (response && response.data) {
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des fiche tech', error);
      return [];
    }
  }
  async get_all_voiture(): Promise<any[]> {
    const url = this.variableService.nom_domaine+'/voiture/marque';
    alert(url);
    try {
      const response: any = await this.httpClient.get(url).toPromise();
      if (response && response.data) {
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des voitures par', error);
      return [];
    }
  }
  async get_all_annonce(): Promise<any[]> {
    const url = this.variableService.nom_domaine+'/annonce/valider';
    try {
      const headers = this.variableService.getHeaderToken();
      //console.log(headers);
      const response: any = await this.httpClient.get(url,{headers}).toPromise();
      if (response && response.data) {
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces', error);
      return [];
    }
  }
}
