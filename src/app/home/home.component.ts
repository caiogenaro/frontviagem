import { Service } from './../service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private service: Service) {}

  formulario!: FormGroup;
  formularioCidades!: FormGroup;
  cozinhas: any;
  isCadastroCozinha: boolean = false;
  isCadastroCidade: boolean = false;

  ngOnInit(): void {
    this.iniciarFormCozinha();
    this.iniciarFormCidade();
    this.getCozinhas();
  }

  //Tipo de Cadastro
  cadastroCozinha() {
    this.isCadastroCozinha = !this.isCadastroCozinha;
    this.isCadastroCidade = false;

    console.log(this.isCadastroCozinha);
  }
  cadastroCidade() {
    this.isCadastroCidade = !this.isCadastroCidade;
    this.isCadastroCozinha = false;

    console.log(this.isCadastroCidade);
  }

  // Iniciar o Modulo do FormGroup no Component
  iniciarFormCozinha() {
    this.formulario = this.formBuilder.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
    });
  }
  iniciarFormCidade() {
    this.formularioCidades = this.formBuilder.group({
      nomeCidade: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      fotoCidade: [null, [Validators.required]],
      valorPassagem: [null, [Validators.required]],
      tipoCozinha: [null, Validators.required],
    });
  }

  //Pegar Cozinhas Existentes na Database para o Form de Cidades
  async getCozinhas() {
    await this.service.listarCozinhas().subscribe(
      (res: any) => {
        this.cozinhas = res.map((value: any) => ({
          nome: value.nome,
          id: value.id,
        }));

        console.log(this.cozinhas);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // Metodos de Cadastro para enviar ao Backend
  salvarCozinha() {
    const cozinha = JSON.stringify(this.formulario.value);
    this.service.incluirCozinha(cozinha);
  }
  salvarCidade() {
    //Destructuring para enviar para o Backend
    const cozinha = this.formularioCidades.value.tipoCozinha.split(' ');
    const cidade = {
      nome: this.formularioCidades.value.nomeCidade,
      foto: this.formularioCidades.value.fotoCidade,
      valor: this.formularioCidades.value.valorPassagem,
      cozinha: {
        id: cozinha[0],
      },
    };

    this.service.incluirCidade(JSON.stringify(cidade));
  }
}
