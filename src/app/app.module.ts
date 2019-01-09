import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './components/app/app.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {routes} from './routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingComponent} from './components/loading/loading.component';
import {LoaderComponent} from './components/loading/loader.component';
import {RegistrationConfirmationComponent} from './components/registration-confirmation/registration-confirmation.component';
import {EmailVerificationComponent} from './components/email-verification/email-verification.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LoadingComponent,
    LoaderComponent,
    RegistrationConfirmationComponent,
    EmailVerificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
