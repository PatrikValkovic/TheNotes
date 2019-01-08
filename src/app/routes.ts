import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationConfirmationComponent} from './components/registration-confirmation/registration-confirmation.component';

export const routes = [
  {
    path: 'register',
    children: [
      {path: 'registered', component: RegistrationConfirmationComponent},
      {path: '', component: RegisterComponent},
    ]
  },

  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];
