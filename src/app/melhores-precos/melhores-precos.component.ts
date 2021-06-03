import { Service } from './../service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-melhores-precos',
  templateUrl: './melhores-precos.component.html',
  styleUrls: ['./melhores-precos.component.css']
})
export class MelhoresPrecosComponent implements OnInit {

  cidades: any = [];

  constructor(private service: Service) { }

  ngOnInit(): void {
    this.getCidades();
  }


  async getCidades(){
    const data: any = await this.service.listarCidades();
    this.cidades = data;
    console.log(data);


  }

}
