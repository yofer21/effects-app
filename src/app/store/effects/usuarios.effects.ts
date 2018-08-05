import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as actions from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    public usuariosService: UsuarioService
  ) {}

  @Effect()
  cargarUsuarios$ = this.actions$.ofType(actions.CARGAR_USUARIOS).pipe(
    switchMap(() => {
      return this.usuariosService.getUsers().pipe(
        map(users => new actions.CargarUsuariosSuccess(users)),
        catchError(error => of(new actions.CargarUsuariosFail(error)))
      );
    })
  );
}
