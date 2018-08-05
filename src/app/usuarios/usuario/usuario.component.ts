import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as actions from '../../store/actions';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  user: Usuario;
  loading: boolean;
  loaded: boolean;
  error: any;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.router.params.subscribe(params => {
      const id = params['id'];
      this.store.dispatch(new actions.CargarUsuario(id));
    });

    this.store.select('usuario').subscribe(usuario => {
      this.user = usuario.user;
      this.loading = usuario.loading;
      this.error = usuario.error;
      this.loaded = usuario.loaded;
    });
  }
}
