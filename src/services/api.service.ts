import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {ErrorModel} from '../contracts/ErrorModel';


@Injectable()
export class ApiService {



    constructor(public dados: HttpClient) {
    }

    patch(url: string, conteudo: any) {
      return this.dados.patch(url, conteudo)
              .pipe(
                  catchError(this.gerenciarErros)
              );
    }

    // tslint:disable-next-line:comment-format
    //AssociarContato
    associar(url: string) {
      return this.dados.post<any>(url , null);
    }


    // POST
    post(url: string, conteudo: any): Observable<any> {
        return this.dados.post<any>(url, conteudo)
            .pipe(
                catchError(this.gerenciarErros)
            );
    }

    // PUT
    put(url: string, conteudo: any): Observable<any> {
        return this.dados.put<any>(url, conteudo)
            .pipe(
                catchError(this.gerenciarErros)
            );
    }

    // GET
    get(url: string, cabecalhos: HttpHeaders = new HttpHeaders()): Observable<any> {
        return this.dados.get<any>(url, {headers: cabecalhos})
            .pipe(
                catchError(this.gerenciarErros)
            );
    }

    // DELETE
    remover(url: string, conteudo: any): Observable<any> {

        return this.dados.delete<any>(url + '/' + conteudo)
            .pipe(
                catchError(this.gerenciarErros)
            );
    }


    // GERENCIA OS ERROS QUE PODEM OCORRER DURANTE AS REQUISIÇÕES HTTP
    public gerenciarErros(error: HttpErrorResponse) {

        /* Gerencia erros do lado do cliente (angular) e/ou de rede, ou seja,
        quando a requisição não chega até o webservice. */
        if (error.error instanceof ErrorEvent) {
            console.error('Falha na aplicação do lado do cliente:', error.error.message);
        } else {
           console.error(
                `Status code: ${error.status}, ` +
                `Erros: ${error.error.valueOf()}`);

        }

          return throwError(error.error);
    }


 /*   private retornaErro(error: HttpErrorResponse) {
        const arrString: string[] = [];

        switch (valor) {
            case 'ConcessionariaId':
                resultado =
                break;
            case 'EmpresaId':
                break;
            case 'EnderecoPrincipal.CidadeId':
                break;
            case 'EnderecoPrincipal.EstadoId':
                break;
            case 'NomeCurto':
                break;
            case 'NumeroPasta':
                break;
            case 'PerfilId':
                break;
            case 'Tensao':
                break;
            /*case 'EnderecoPrincipal.CidadeId':
                break;
            case 'EnderecoPrincipal.EstadoId':
                break;
            case 'NomeCurto':
                break;
            case 'NumeroPasta':
                break;
            return
        }
    }*/

}
