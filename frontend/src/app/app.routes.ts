import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Registration } from './pages/registration/registration';
import { Login } from './pages/login/login';
import { Event } from './pages/event/event';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'registration', component: Registration, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'event', component: Event }
];
