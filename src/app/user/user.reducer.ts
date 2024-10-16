import { createReducer, on } from '@ngrx/store';
import { User } from './user.model';
import * as UserActions from './user.actions';

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
    loading: false,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
