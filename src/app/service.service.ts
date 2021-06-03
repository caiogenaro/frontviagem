import { Cidades } from './models/Cidades';
import { Cozinha } from './models/Cozinha';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Service {
  
  constructor(private httpClient: HttpClient) { }
  
  URL = 'http://localhost:8080';  



  // Gets
  listarCozinhas(): Observable<Cozinha[]> {
    return this.httpClient.get<Cozinha[]>(`${this.URL}/cozinha`);
  }

  
  listarCidades() {
    return this.httpClient.get(`${this.URL}/cidades`).toPromise();
  }
  listarCidadesPage(numeroPage: any) {
    const page = { page: numeroPage};
    return this.httpClient.get(`${this.URL}/cidades/listarPaginado`, { params: page}).toPromise();
  }
  listarCidadesId(id: number) {
    return this.httpClient.get(`${this.URL}/cidades/${id}`).toPromise();
  }
  listarCalculoMedia(id: number, dias: string) {

    let data = {dias: dias};
    
    return this.httpClient.get(`${this.URL}/cidades/media/${id}`, {params: data}).toPromise();
  }



  //Posts

  incluirCozinha(cozinha: any){
    
    let header = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }    

    this.httpClient.post(`${ this.URL }/cozinha`, cozinha, header).subscribe(
      resultado => {
        console.log(resultado)
      },
      erro => {
        if(erro.status == 400) {
          console.log(erro);
        }
      }
    );
  }
  incluirCidade(cidade: any){
    
    let header = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }    

    this.httpClient.post(`${ this.URL }/cidades`, cidade, header).subscribe(
      resultado => {
        console.log(resultado)
      },
      erro => {
        if(erro.status == 400) {
          console.log(erro);
        }
      }
    );
  }

}
