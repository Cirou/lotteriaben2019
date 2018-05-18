import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProfilepageComponent } from './pages/profilepage/profilepage.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SettingspageComponent } from './pages/settingspage/settingspage.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { GroupspageComponent } from './pages/groupspage/groupspage.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginpageComponent },
  { path: 'signin', component: LoginpageComponent },
  { path: 'logout', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'app', component: HomepageComponent, children:
      [
        { path: '', component: GroupspageComponent, outlet: 'sub' },
        { path: 'home', component: GroupspageComponent, outlet: 'sub' },
        { path: 'profile', component: ProfilepageComponent, outlet: 'sub' },
        { path: 'settings', component: SettingspageComponent, outlet: 'sub' },

      ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full'},
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
