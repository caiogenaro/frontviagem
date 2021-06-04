import { Service } from './../service.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

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
  sucessoCozinha: boolean = false;
  sucessoCidade: boolean = false;

  ngOnInit(): void {
    this.iniciarFormCozinha();
    this.iniciarFormCidade();
    this.getCozinhas();
  }

  //Tipo de Cadastro botao
  cadastroCozinha() {
    this.isCadastroCozinha = !this.isCadastroCozinha;
    this.isCadastroCidade = false;
  }
  cadastroCidade() {
    this.isCadastroCidade = !this.isCadastroCidade;
    this.isCadastroCozinha = false;
  }

  // Iniciar o Modulo e validacoes do FormGroup no Component
  iniciarFormCozinha() {
    this.formulario = this.formBuilder.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  //Inicializar o modulo e validacoes dos formularios
  iniciarFormCidade() {
    this.formularioCidades = this.formBuilder.group({
      nomeCidade: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      fotoCidade: [null, [Validators.required]],
      valorPassagem: [null, [Validators.required]],
      valorRefeicao: [null, [Validators.required]],
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
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //Metodo de Validação
  protected forceValidateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl && control.enabled) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.forceValidateAllFormFields(control);
      }
    });
  }

  // Metodos de Cadastro para enviar ao Backend
  salvarCozinha() {
    //Check se o formluario atual está valido e set no atributo para valid
    this.forceValidateAllFormFields(this.formulario);
    this.formulario.updateValueAndValidity();

    if (this.formulario.valid) {
      const cozinha = JSON.stringify(this.formulario.value);
      this.service.incluirCozinha(cozinha);
      alert('Cozinha Cadastrada com Sucesso');
    } else {
      console.log('cozinha invalida');
    }
  }
  salvarCidade() {
    //Check se o formluario atual está valido e set no atributo para valid
    this.forceValidateAllFormFields(this.formularioCidades);
    this.formulario.updateValueAndValidity();
    //Restruturar para enviar para o Backend
    if (this.formularioCidades.valid) {
      const cozinha = this.formularioCidades.value.tipoCozinha.split(' ');
      const cidade = {
        nome: this.formularioCidades.value.nomeCidade,
        foto: this.formularioCidades.value.fotoCidade,
        valor: this.formularioCidades.value.valorPassagem,
        valorRefeicao: this.formularioCidades.value.valorRefeicao,
        cozinha: {
          id: cozinha[0],
        },
      };

      this.service.incluirCidade(JSON.stringify(cidade));
      alert('Cozinha Cadastrada com Sucesso');
    } else {
      console.log('formulario invalido');
    }
  }
}
