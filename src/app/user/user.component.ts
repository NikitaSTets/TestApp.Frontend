import { Component, OnInit } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './user.model';
import * as UserActions from './user.actions';
import {
  selectAllUsers,
  selectUserLoading,
  selectUserError,
} from './user.selectors';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule, StoreModule],
})
export class UserComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  user: User = { name: '', email: '', password: '', consentToStoreData: false };

  constructor(private store: Store) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUserLoading);
    this.error$ = this.store.select(selectUserError);
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(UserActions.createUser({ user: this.user }));
      this.user = {
        name: '',
        email: '',
        password: '',
        consentToStoreData: false,
      };
      form.resetForm();
    }
  }
}
