import { Component } from '@angular/core';
import { FilaService, Senha } from '../services/fila.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  ultimaSenha = { numero: '123', tipo: 'SP' }; 

  constructor(private filaService: FilaService) {}

  // Método para emitir senha
  emitirSenha(tipo: 'SP' | 'SG' | 'SE') {
    this.filaService.emitirSenha(tipo).subscribe(senha => {
      this.ultimaSenha = senha; // Armazenando a última senha gerada
    }, error => {
      console.error('Erro ao emitir senha', error);
    });
  }
}
