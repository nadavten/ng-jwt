import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { RouterModule, Routes } from '@angular/router';


const _routes : Routes = [
    {path:'',component:AuthComponent},
    {path:'home' , component:HomeComponent,canActivate:[AuthGuard]}
]

export const routes = RouterModule.forRoot(_routes,{useHash:true});