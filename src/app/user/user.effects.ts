import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from './user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap(({ user }) =>
        this.userService.createUser(user).pipe(
          map((newUser) => UserActions.createUserSuccess({ user: newUser })),
          catchError((error) => {
            const errorMessage =
              error.error?.message ||
              'An error occurred while creating the user.';

            return of(UserActions.createUserFailure({ error: errorMessage }));
          })
        )
      )
    )
  );
}
