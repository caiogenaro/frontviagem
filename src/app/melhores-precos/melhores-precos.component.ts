import { Service } from './../service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-melhores-precos',
  templateUrl: './melhores-precos.component.html',
  styleUrls: ['./melhores-precos.component.css'],
})
export class MelhoresPrecosComponent implements OnInit {
  Pagina: any = 0;
  Ordenacao: any = '';

  cidades: any = [];

  constructor(private service: Service) {}

  ngOnInit(): void {
    this.getCidades(this.Pagina);
  }

  //Metodo para listar as cidades, parametro de ordenação/paginação para o backend
  async getCidades(query: any) {
    if (typeof query === 'string') {
      const order = { order: query };
      const data: any = await this.service.listarCidadesPage(order);
      this.cidades = data.content;
    } else {
      const page = { page: query };
      const data: any = await this.service.listarCidadesPage(page);
      this.cidades = data.content;
    }
  }
}
