import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {
  private sequencias: { [tipo: string]: number } = { SP: 0, SE: 0, SG: 0 };

  gerarSenha(tipo: 'SP' | 'SE' | 'SG'): string {
    const data = new Date();
    const YY = data.getFullYear().toString().slice(2);
    const MM = String(data.getMonth() + 1).padStart(2, '0');
    const DD = String(data.getDate()).padStart(2, '0');

    // Incrementa sequência por tipo
    this.sequencias[tipo]++;
    const SQ = String(this.sequencias[tipo]).padStart(3, '0');

    return `${YY}${MM}${DD}-${tipo}${SQ}`;
  }

  resetarSequencias() {
    this.sequencias = { SP: 0, SE: 0, SG: 0 };
  }
}


// @Injectable({
//   providedIn: 'root'
// })
// export class SenhasService {

//   public senhasGeral: number = 0;
//   public senhasPrior: number = 0;
//   public senhasExame: number = 0;
//   public senhasTotal: number = 0;

//   public inputNovaSenha: string = '';

//   public senhasArray: { SG: string[], SP: string[], SE: string[] } = {
//     SG: [],
//     SP: [],
//     SE: []
//   };

//   somaGeral() {
//     this.senhasGeral++; this.senhasTotal++;
//   }

//   somaPrior() {
//     this.senhasPrior++; this.senhasTotal++;
//   }

//   somaExame() {
//     this.senhasExame++; this.senhasTotal++;
//   }
//   novaSenha(tipoSenha: string = '') {
//     if (tipoSenha == 'SG') {
//       this.somaGeral();
//       this.inputNovaSenha =
//         new Date().getFullYear().toString().substring(2, 4) +
//         new Date().getMonth().toString().padStart(2, '0') +
//         new Date().getDay().toString().padStart(2, '0') +
//         '-' +
//         tipoSenha +
//         (this.senhasArray['SG'].length + 1).toString().padStart(2, '0');
//       this.senhasArray.SG.push(this.inputNovaSenha);
//     } else if (tipoSenha == 'SP') {
//       this.somaPrior();
//       this.inputNovaSenha =
//         new Date().getFullYear().toString().substring(2, 4) +
//         new Date().getMonth().toString().padStart(2, '0') +
//         new Date().getDay().toString().padStart(2, '0') +
//         '-' +
//         tipoSenha +
//         (this.senhasArray['SP'].length + 1).toString().padStart(2, '0');
//       this.senhasArray.SP.push(this.inputNovaSenha);
//     } else if (tipoSenha == 'SE') {
//       this.somaExame();
//       this.inputNovaSenha =
//         new Date().getFullYear().toString().substring(2, 4) +
//         new Date().getMonth().toString().padStart(2, '0') +
//         new Date().getDay().toString().padStart(2, '0') +
//         '-' +
//         tipoSenha +
//         (this.senhasArray['SE'].length + 1).toString().padStart(2, '0');
//       this.senhasArray.SE.push(this.inputNovaSenha);
//     }
//     console.log(this.senhasArray);
//   }


// }
