import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Registration } from './pages/registration/registration';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'registration', component: Registration },
  { path: 'login', component: Login }
];