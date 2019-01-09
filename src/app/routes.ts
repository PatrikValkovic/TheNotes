import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationConfirmationComponent} from './components/registration-confirmation/registration-confirmation.component';
import {EmailVerificationComponent} from './components/email-verification/email-verification.component';
import {MainApplicationComponent} from './components/main-application/main-application.component';

export const routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  {
    path: 'register',
    children: [
      {path: 'registered', component: RegistrationConfirmationComponent},
      {path: 'confirmation', component: EmailVerificationComponent},
      {path: '', component: RegisterComponent},
    ]
  },

  {path: 'login', component: LoginComponent},

  {
    path: 'app',
    children: [
      {path: '', component: MainApplicationComponent},
    ]
  },

];
