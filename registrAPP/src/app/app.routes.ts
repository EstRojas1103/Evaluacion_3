import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'home-estudiante',
    loadComponent: () => import('./home-estudiante/home-estudiante.page').then((m) => m.HomeEstudiantePage),
  },
  {
    path: 'home-docente',
    loadComponent: () => import('./home-docente/home-docente.page').then((m) => m.HomeDocentePage),
  },
  {
    path: 'registrar-qr',
    loadComponent: () => import('./registrar-qr/registrar-qr.page').then((m) => m.RegistrarQrPage),
  },
  
];
