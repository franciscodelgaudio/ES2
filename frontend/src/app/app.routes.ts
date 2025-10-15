import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Registration } from './pages/registration/registration';
import { Login } from './pages/login/login';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [authGuard] },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'registration', component: Registration },
  { path: 'login', component: Login }
];
