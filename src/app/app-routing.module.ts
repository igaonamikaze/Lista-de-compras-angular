import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.FolderPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'criarlista',
    loadChildren: () => import('./views/criarlista/criarlista.module').then(m => m.CriarlistaPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'lista',
    loadChildren: () => import('./views/modals/lista/lista.module').then(m => m.ListaPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./views/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'usar-lista/:id',
    loadChildren: () => import('./views/usar-lista/usar-lista.module').then(m => m.UsarListaPageModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [AuthGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
