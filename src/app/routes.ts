import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';

export const routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];
