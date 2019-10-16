import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'sign', pathMatch: 'full' }, 
  { path: 'sign', loadChildren: './pages/sign/sign.module#SignPageModule' },
  { path: 'movie', loadChildren: './pages/movie-list/movie-list.module#MovieListPageModule' },
  { path: 'movieInfo', loadChildren: './pages/movie-info/movie-info.module#MovieInfoPageModule' },
  { path: 'movieInfo/:id', loadChildren: './pages/movie-info/movie-info.module#MovieInfoPageModule' },
  { path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
