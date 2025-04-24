import { Component, OnInit } from '@angular/core';
import { FilaService } from '../services/fila.service';

@Component({
  selector: 'app-relatorios',
  standalone: false,
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
})
export class RelatoriosPage{

  diario: any;
  mensal: any;
  loading = false;

  constructor(private filaService: FilaService) {}

  loadRelatorios() {
    this.loading = true;
    this.filaService.relatorioDiario().subscribe(d => {
      this.diario = d;
      this.filaService.relatorioMensal().subscribe(m => {
        this.mensal = m;
        this.loading = false;
      });
    }, () => this.loading = false);
  }
}
