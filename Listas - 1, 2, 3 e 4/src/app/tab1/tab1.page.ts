// import { Component } from '@angular/core';
// import { SenhasService } from '../services/senhas.service';

// @Component({
//   selector: 'app-tab1',
//   templateUrl: 'tab1.page.html',
//   styleUrls: ['tab1.page.scss'],
//   standalone: false,
// })
// export class Tab1Page {

//   // adiciona o botão "fechar" ao alerta
//   alertButtons = ['Fechar'];

//   constructor(public senhasService: SenhasService){
    
//   }

// }

import { Component, Input } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page {

  senhaAtual = '';

  constructor(private senhasService: SenhasService) {}

    emitirSenha(tipo: 'SP' | 'SE' | 'SG') {
      this.senhaAtual = this.senhasService.gerarSenha(tipo);
    }

  // @Input() senhaAtual: string = '';
  // @Input() emitir!: (tipo: string) => void;

  // emitirSenha(tipo: string) {
  //   if (this.emitir) {
  //     this.emitir(tipo);
  //   }
  // }
}

function emitirSenha(tipo: any, string: any) {
  throw new Error('Function not implemented.');
}

