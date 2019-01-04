import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable({providedIn: 'root'})
export class ViewService {
    public valor = true;

    setValor(item: boolean) {
        this.valor = item;
    }

}

