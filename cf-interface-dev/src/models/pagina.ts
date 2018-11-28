import {Subscription} from 'rxjs/internal/Subscription';
import { Input } from '@angular/core';

export abstract class Pagina {

    // Define se o formulário estará habilitado para edição ou não
    public bloquearEdicao = true;

    // Título que será exibido no topo da página
   @Input() titulo = '';

    // Espectador que armazena subscrições a eventos
    public espectador: Subscription;


}
