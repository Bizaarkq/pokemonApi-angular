import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleItemComponent } from './components/detalle-item/detalle-item.component';
import { MenuComponent } from './components/menu/menu.component';
import { LienzoComponent } from './layouts/lienzo/lienzo.component';

const routes: Routes = [
  {
    path: '',
    component: LienzoComponent,
    children: [
      {
        path: '',
        redirectTo: '/menu',
        pathMatch: 'full'
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'pokemon/:idPokemon',
        component: DetalleItemComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'menu'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
