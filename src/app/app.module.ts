import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routes } from './app-routing.module';

import { AuthService } from './services/auth/auth.service';
import { DataService } from './services/data/data.service';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AuthComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,

    routes,
  ],
  providers: [
    DataService,
    AuthService,

    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
