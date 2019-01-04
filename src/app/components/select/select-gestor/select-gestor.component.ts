import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GestoresService} from '../../../../services/gestores.service';
import {IGestor} from '../../../../contracts/IGestor';

@Component({
  selector: 'app-select-gestor',
  templateUrl: './select-gestor.component.html',
  styleUrls: ['./select-gestor.component.scss']
})
export class SelectGestorComponent implements OnInit {

    public gestores: IGestor[] = [];
    public gestorId: number;

    @Output()
    private selecionouGestor = new EventEmitter();

    constructor(private gestoresService: GestoresService) { }


    ngOnInit() {
        this.carregarGestores();
    }

    carregarGestores() {
        this.gestoresService.listar().subscribe(gestores => {
            this.gestores = gestores;
        });
    }

    emitirGestor(gestorId) {
        this.selecionouGestor.emit(gestorId);
    }


}
