import { Injectable, Output } from '@angular/core';
import { INotificacao } from '../contracts/INotificacao';
import { Subject } from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';


@Injectable()
export class NotificacoesService {

    @Output()
    public notificacao = new Subject<INotificacao>();

    constructor() {}

    erro(texto: string) {
        this.notificacao.next({tipo: 'erro', texto: texto});
    }

    sucesso(texto: string) {
        this.notificacao.next({tipo: 'sucesso', texto: texto});
    }

    informacao(texto: string) {
        this.notificacao.next({tipo: 'informacao', texto: texto});
    }

    advertencia(texto: string) {
        this.notificacao.next({tipo: 'advertencia', texto: texto});
    }

    // Getter utilizado em toda a aplicação para obter as notificações.
    getNotificacao(): Observable<INotificacao> {
        return this.notificacao.asObservable();
    }
}
