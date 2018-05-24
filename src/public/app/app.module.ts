import { CdkTableModule } from '@angular/cdk/table';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// PAGES
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { ProfilepageComponent } from './pages/profilepage/profilepage.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SettingspageComponent } from './pages/settingspage/settingspage.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { GroupspageComponent } from './pages/groupspage/groupspage.component';
import { GroupdetailpageComponent } from  './pages/groupdetailpage/groupdetailpage.component';

// CUSTOM MODULES
import { RoutingModule } from './routing.module';
import { MaterialDesignModule } from './material-design.module';

// CUSTOM COMPONENTS
import { DrawerComponent } from './components/drawer/drawer.component';
import { ListviewComponent } from './components/listview/listview.component';

// CUSTOM SERVICES
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    MainpageComponent,
    ProfilepageComponent,
    HomepageComponent,
    DrawerComponent,
    ListviewComponent,
    SettingspageComponent,
    LoginpageComponent,
    GroupspageComponent,
    GroupdetailpageComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    UserService
  ],
  exports: [RouterModule],
  bootstrap: [MainpageComponent]
})
export class AppModule {

  ngDoBootstrap() { }

}
