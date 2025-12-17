import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
    { path: 'book-details', loadChildren: () => import('./book-details/book-details.module').then(m => m.BookDetailsPageModule) },
  { path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesPageModule) }
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })], 
  exports: [RouterModule] 
})
export class AppRoutingModule {}
