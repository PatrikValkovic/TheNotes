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
import {MainApplicationComponent} from './components/main-application/main-application.component';
import {LeftPanelComponent} from './components/left-panel/left-panel.component';
import {RightPanelComponent} from './components/right-panel/right-panel.component';
import {TopPanelComponent} from './components/top-panel/top-panel.component';
import {TagComponent} from './components/tag/tag.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LoadingComponent,
    LoaderComponent,
    RegistrationConfirmationComponent,
    EmailVerificationComponent,
    MainApplicationComponent,
    LeftPanelComponent,
    RightPanelComponent,
    TopPanelComponent,
    TagComponent
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
