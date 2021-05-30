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
  cidades: any;

  cidadesInfo: any = [];

  constructor(private formBuilder: FormBuilder, private service: Service) {}

  ngOnInit(): void {
    this.getCidades(); 
  }

 async getCidades(){
    this.cidades = await this.service.listarCidades();
    console.log(this.cidades)

  }


  async infoCidades(id: any){

    const data = await this.service.listarCidadesId(id);
    if(this.cidadesInfo){
      this.cidadesInfo = [];
      this.cidadesInfo.push(data)
    }
    console.log(this.cidadesInfo)

  }


}
