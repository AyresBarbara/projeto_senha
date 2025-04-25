import { Component } from '@angular/core';
import { FilaService, Senha } from '../services/fila.service';

@Component({
  selector: 'app-atendimento',
  standalone: false,
  templateUrl: './atendimento.page.html',
  styleUrls: ['./atendimento.page.scss'],
})
export class AtendimentoPage {

  historico: Senha[] = [];
  loading = false;

  constructor(private filaService: FilaService) {}

  chamar() {
    this.loading = true;
    this.filaService.chamarSenha().subscribe(senha => {
      this.historico.unshift(senha); // Assumindo que "senha" tem as propriedades que você espera
      if (this.historico.length > 5) this.historico.pop();
      this.loading = false;
    }, () => this.loading = false);
  }
}
