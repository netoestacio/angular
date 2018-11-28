import { ILocalizacao } from '../contracts/ILocalizacao';
import { IClasse } from '../contracts/IClasses';
import {environment} from '../environments/environment';
import {ApiService} from './api.service';
import {Injectable, OnInit} from '@angular/core';
import {StateGroup} from '../contracts/StateGroup';
import {Observable} from 'rxjs';
import {IContrato} from '../contracts/IContrato';

@Injectable({providedIn: 'root'})
export class GlobalService implements OnInit {

    ccid: number;

    public url = environment.apiEndpoint;

    public arrAutocomplete: any[];
    /*Somente para deixar monstado o componente*/

    stateGroups: StateGroup[];

    constructor(public api: ApiService) {
    }

    ngOnInit(): void {
        this.getAutoComplete();
    }


    setccid(valor) {
        this.ccid = valor;
        /*this.getlistarContatoByCliente(this.ccid)
          .subscribe( (resp: IContato[]) => {
            this.listaStorage = resp;
            console.log( resp);
          } );*/

    }

    listarContratos(): Observable<IContrato[]> {
       return this.api.get(this.url + '/contratos');
    }

    listarSubgrupo(): Observable<any> {
       return this.api.get(this.url + '/subgrupos');
    }

    listarClasses(): Observable<IClasse[]> {
       return this.api.get(this.url + '/classes');
    }

    listarLocalizacoes(): Observable<ILocalizacao[]> {
      return this.api.get(this.url + '/localizacoes');
    }

    getAutoComplete() {
        return this.api.get(this.url);
    }

    searchAutocomplete(valor: { name: string } = {name: ''}, page = 1) {
        return this.arrAutocomplete.includes(valor.name);
    }

    mockAutoComplete(): StateGroup[] {

        return this.stateGroups = [{
            letter: 'A',
            names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
        }, {
            letter: 'C',
            names: ['California', 'Colorado', 'Connecticut']
        }, {
            letter: 'D',
            names: ['Delaware']
        }, {
            letter: 'F',
            names: ['Florida']
        }, {
            letter: 'G',
            names: ['Georgia']
        }, {
            letter: 'H',
            names: ['Hawaii']
        }, {
            letter: 'I',
            names: ['Idaho', 'Illinois', 'Indiana', 'Iowa']
        }, {
            letter: 'K',
            names: ['Kansas', 'Kentucky']
        }, {
            letter: 'L',
            names: ['Louisiana']
        }, {
            letter: 'M',
            names: ['Maine', 'Maryland', 'Massachusetts', 'Michigan',
                'Minnesota', 'Mississippi', 'Missouri', 'Montana']
        }, {
            letter: 'N',
            names: ['Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
                'New Mexico', 'New York', 'North Carolina', 'North Dakota']
        }, {
            letter: 'O',
            names: ['Ohio', 'Oklahoma', 'Oregon']
        }, {
            letter: 'P',
            names: ['Pennsylvania']
        }, {
            letter: 'R',
            names: ['Rhode Island']
        }, {
            letter: 'S',
            names: ['South Carolina', 'South Dakota']
        }, {
            letter: 'T',
            names: ['Tennessee', 'Texas']
        }, {
            letter: 'U',
            names: ['Utah']
        }, {
            letter: 'V',
            names: ['Vermont', 'Virginia']
        }, {
            letter: 'W',
            names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
        }];
    }

}
