import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VariableService {
  nom_domaine:any="https://devvoitures5backend-production.up.railway.app";
  constructor() { }

  getidUser(){
    const json = localStorage.getItem('token');
    if(json != null){
      const k = JSON.parse(json);
      return k.data[0].idUser;
    }
    return null;
  }
  getToken(){
    const json = localStorage.getItem('token');
    if(json != null){
      const k = JSON.parse(json);
      return k.data[1].token;
    }
    return null;
  }
  getHeaderToken(){
    const token=this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  
}
