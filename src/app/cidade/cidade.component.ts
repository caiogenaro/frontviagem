import { Service } from './../service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.css'],
})
export class CidadeComponent implements OnInit {
  formularioCidades!: FormGroup;
  cidades: any = [];

  cidadesInfo: any = [];
  media: any = [];
  isMedia: Boolean = false;
  numeroPage: number = 0;
  initialValue = {
    target: {
      text: 1
    }
  }

  constructor(private formBuilder: FormBuilder, private service: Service) {}

  ngOnInit(): void {
    this.getCidades(this.initialValue)       
 
  }

  iniciarFormMedia() {
    this.media = this.formBuilder.group({
      dias: [null, [Validators.required]]
    });
  }

  //Pegar informaçoes das cidades
  async getCidades(page: any) {

    if(page.target.text == 'Previous'){
      this.numeroPage = this.numeroPage - 1;
    }
    else if(page.target.text == 'Next'){
      this.numeroPage += 1;
    }
    else{
      this.numeroPage = parseInt(page.target.text) - 1
    }

    if(this.numeroPage <= 2 && this.numeroPage >= 0){
      const data: any = await this.service.listarCidadesPage(this.numeroPage);
      this.cidades = data.content; 
    }
    else{
      console.log("Pagina não existentente")
    }

  }

  //Metodo para Mostrar informações das cidades
  async infoCidades(id: any) {
    const data = await this.service.listarCidadesId(id);
    if (this.cidadesInfo) {
      this.cidadesInfo = [];
      this.cidadesInfo.push(data);
      this.isMedia = false;      
    }
  }

  //Calcular Media
  async calcularMedia(id: any, dias: any) {
    const data = await this.service.listarCalculoMedia(id, dias);
    if (this.cidadesInfo) {
      this.cidadesInfo = [];
      this.cidadesInfo.push(data);
      this.isMedia = true;
    }
    console.log(this.cidadesInfo);  
  }
}
