import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LotterypageComponent } from './pages/lotterypage/lotterypage.component';
import { AdminpageComponent } from './pages/adminpage/adminpage.component';
import { CatalogopageComponent } from './pages/catalogopage/catalogopage.component';
import { AssegnapremiopageComponent } from './pages/assegnapremiopage/assegnapremiopage.component';
import { RisultativenditepageComponent } from './pages/risultativenditepage/risultativenditepage.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';

const routes: Routes = [
  { path: '', component: MainpageComponent},
  { path: 'home', component: LotterypageComponent},
  { path: 'adminpage', component: AdminpageComponent },
  { path: 'adminpage/assegnapremio', component: AssegnapremiopageComponent },
  { path: 'adminpage/risultativendite', component: RisultativenditepageComponent },
  { path: 'adminpage/:id', component: AdminpageComponent },
  { path: 'catalogo', component: CatalogopageComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class RoutingModule { }
