import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as actions from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    public usuariosService: UsuarioService
  ) {}

  @Effect()
  cargarUsuario$ = this.actions$.ofType(actions.CARGAR_USUARIO).pipe(
    switchMap(action => {
      return this.usuariosService.getUserById(action['id']).pipe(
        map(user => new actions.CargarUsuarioSuccess(user)),
        catchError(error => of(new actions.CargarUsuarioFail(error)))
      );
    })
  );
}
