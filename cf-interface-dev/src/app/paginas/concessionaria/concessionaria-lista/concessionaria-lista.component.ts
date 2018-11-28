import { Component, OnInit } from '@angular/core';
import {ConcessionariasService} from '../../../../services/concessionarias.service';
import {IConcessionaria} from '../../../../contracts/IConcessionaria';

@Component({
  selector: 'app-concessionaria-lista',
  templateUrl: './concessionaria-lista.component.html',
  styleUrls: ['./concessionaria-lista.component.scss']
})
export class ConcessionariaListaComponent implements OnInit {

    titulo = 'concessionárias';
    concessionarias: IConcessionaria[] = [];

  constructor(public concessionarisService: ConcessionariasService) { }

  ngOnInit() {
    this.carregarConcessionarias();
  }

    carregarConcessionarias() {
        this.concessionarisService.listar()
            .subscribe(resposta => {
                this.concessionarias = resposta;
            });
    }

    deletarConcessionaria(id: number) {
        this.concessionarisService.remover(id)
            .subscribe(
                sucesso => {
                    this.carregarConcessionarias();
                    console.log('Concessionaria OK');
                    this.reloadView();
                },
                erro => {
                    console.log('Concessionaria OK');
                    setTimeout( () => {
                        window.location.reload();
                    }, 3500 );
                }
            );
    }

    reloadView() {
        setTimeout( () => {
            window.location.reload();
        }, 1500 );
    }


}
