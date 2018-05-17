import { CdkTableModule } from '@angular/cdk/table';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PAGES
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { ProfilepageComponent } from './pages/profilepage/profilepage.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SettingspageComponent } from './pages/settingspage/settingspage.component';

// CUSTOM MODULES
import { RoutingModule } from './routing.module';
import { MaterialDesignModule } from './material-design.module';

// CUSTOM COMPONENTS
import { DrawerComponent } from './components/drawer/drawer.component';
import { ListviewComponent } from './components/listview/listview.component';

@NgModule({
  declarations: [
    MainpageComponent,
    ProfilepageComponent,
    HomepageComponent,
    DrawerComponent,
    ListviewComponent,
    SettingspageComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [MainpageComponent]
})
export class AppModule {

  ngDoBootstrap() { }

}
