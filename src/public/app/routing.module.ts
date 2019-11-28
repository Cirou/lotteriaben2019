import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProfilepageComponent } from './pages/profilepage/profilepage.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SettingspageComponent } from './pages/settingspage/settingspage.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { GroupspageComponent } from './pages/groupspage/groupspage.component';
import { GroupdetailpageComponent } from  './pages/groupdetailpage/groupdetailpage.component';
import { PollpageComponent } from  './pages/pollpage/pollpage.component';
import { SearchpageComponent } from  './pages/searchpage/searchpage.component';
import { PreferencespageComponent } from './pages/preferencespage/preferencespage.component';
import { SearchgrouppageComponent } from './pages/searchgrouppage/searchgrouppage.component';

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
        { path: 'groupdetail/:id', component: GroupdetailpageComponent, outlet: 'sub'},
        { path: 'poll/:id', component: PollpageComponent, outlet: 'sub'},
        { path: 'search/:id', component: SearchpageComponent, outlet: 'sub'},
        { path: 'searchgroup', component: SearchgrouppageComponent, outlet: 'sub'},
        { path: 'preferences', component: PreferencespageComponent, outlet: 'sub' },

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
