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

  constructor(private formBuilder: FormBuilder, private service: Service) {}

  ngOnInit(): void {
    this.getCidades();
  }

  iniciarFormMedia() {
    this.media = this.formBuilder.group({
      dias: [null, [Validators.required]]
    });
  }

  //Pegar informaçoes das cidades
  async getCidades() {
    const data: any = await this.service.listarCidades();
    this.cidades = data.content;    
    console.log(data)
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
