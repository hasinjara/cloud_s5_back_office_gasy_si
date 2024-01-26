import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VariableService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  marques:any[] = [];

  constructor(private variableService:VariableService,private httpClient: HttpClient) {}
  async get_all_marque(): Promise<any[]> {
    const url = this.variableService.nom_domaine+'/marque';
    try {
      const response: any = await this.httpClient.get(url).toPromise();
      if (response && response.data) {
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des marques', error);
      return [];
    }
  }

}
