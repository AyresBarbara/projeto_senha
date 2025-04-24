import { Component } from '@angular/core';
import { FilaService, Senha } from '../services/fila.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  ultimaSenha?: Senha;
  loading = false;

  constructor(private filaService: FilaService) {}

  
  ngOnInit(): void {
  
  }

  emitir(tipo: 'SP' | 'SG' | 'SE') {
    this.loading = true;
    this.filaService.emitirSenha(tipo).subscribe(senha => {
      this.ultimaSenha = senha;
      this.loading = false;
    }, 
    (error) => {
      console.error('Erro ao emitir senha', error);
      this.loading = false;
    }
  );
  
  }
}
