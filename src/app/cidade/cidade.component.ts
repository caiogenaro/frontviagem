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
  Pagina: any = 0;

  cidadesInfo: any = [];
  media: any = [];
  isMedia: Boolean = false;
  numeroPage: number = 0;


  constructor(private formBuilder: FormBuilder, private service: Service) {}

  ngOnInit(): void {
    this.getCidades(this.Pagina)       
 
  }

  //Inciar o form de Media
  iniciarFormMedia() {
    this.media = this.formBuilder.group({
      dias: [null, [Validators.required]]
    });
  }

  //Listar cidades com parametro de paginacao
  async getCidades(query: any){
    this.Pagina = query;
    const page = { page: query};
    const data: any = await this.service.listarCidadesPage(page)
    this.cidades = data.content

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
  }
}
