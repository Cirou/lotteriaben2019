import { CdkTableModule } from '@angular/cdk/table';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
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
import { GroupdetailpageComponent } from './pages/groupdetailpage/groupdetailpage.component';
import { PollpageComponent } from './pages/pollpage/pollpage.component';
import { SearchpageComponent , FilterPipe } from './pages/searchpage/searchpage.component';
import { PreferencespageComponent } from './pages/preferencespage/preferencespage.component';
import { SearchgrouppageComponent } from './pages/searchgrouppage/searchgrouppage.component';

// CUSTOM MODULES
import { RoutingModule } from './routing.module';
import { MaterialDesignModule } from './material-design.module';

// CUSTOM COMPONENTS
import { DrawerComponent } from './components/drawer/drawer.component';
import { ListviewComponent } from './components/listview/listview.component';
import { ChatComponent } from './components/chat/chat.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { CibiDialogComponent } from './components/cibi-dialog/cibi-dialog.component';
import { TipDialogComponent } from './components/tip-dialog/tip-dialog.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LocationDialogComponent } from './components/location-dialog/location-dialog.component';
import { AlertpopupComponent } from './components/alertpopup/alertpopup.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { GroupdialogComponent } from './components/groupdialog/groupdialog.component';

// CUSTOM SERVICES
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { GroupService } from './services/group.service';
import { FoodService } from './services/food.service';
import { LoaderService } from './services/loader.service';
import { SearchService } from './services/search.service';
import { RootService } from './services/root.service';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    // COMPONENTS
    ChatComponent,
    SearchbarComponent,
    DrawerComponent,
    ListviewComponent,
    CibiDialogComponent,
    TipDialogComponent,
    LoaderComponent,
    LocationDialogComponent,
    AlertpopupComponent,
    GroupdialogComponent,
    // PAGES
    MainpageComponent,
    ProfilepageComponent,
    HomepageComponent,
    SettingspageComponent,
    LoginpageComponent,
    GroupspageComponent,
    GroupdetailpageComponent,
    PollpageComponent,
    SearchpageComponent,
    SearchgrouppageComponent,
    ChatMessageComponent,
    PreferencespageComponent,
    // PIPE
    FilterPipe
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
    UserService,
    GroupService,
    FoodService,
    LoaderService,
    SearchService,
    CookieService,
    RootService
  ],
  exports: [RouterModule],
  bootstrap: [MainpageComponent],
  entryComponents: [CibiDialogComponent, LocationDialogComponent, TipDialogComponent, GroupdialogComponent]
})
export class AppModule {

  ngDoBootstrap() { }

}
