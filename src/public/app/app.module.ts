import { CdkTableModule } from '@angular/cdk/table';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// PAGES
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { LotterypageComponent } from './pages/lotterypage/lotterypage.component';
import { AdminpageComponent } from './pages/adminpage/adminpage.component';
import { CatalogopageComponent } from './pages/catalogopage/catalogopage.component';

// CUSTOM MODULES
import { RoutingModule } from './routing.module';
import { MaterialDesignModule } from './material-design.module';

// IMAGE RESIZING
import { Ng2ImgMaxModule } from 'ng2-img-max';

// CUSTOM COMPONENTS
//nothing

// CUSTOM SERVICES
import { PremiService } from './services/premi.service';
import { RootService } from './services/root.service';
import { ImageService } from './services/image.service';


//PIPES
import { SearchFilterPipe } from './filters/search-filter.pipe';
import { DataPrintPipe } from './filters/data-print.pipe';

import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';

@NgModule({
  declarations: [
    // COMPONENTS
    // nothing
    // PAGES
    LotterypageComponent,
    AdminpageComponent,
    CatalogopageComponent,
    MainpageComponent,
    // PIPE
    SearchFilterPipe,
    DataPrintPipe,
    ScrollTopComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Ng2ImgMaxModule
  ],
  providers: [
    PremiService,
    RootService,
    ImageService
  ],
  exports: [RouterModule],
  bootstrap: [MainpageComponent],
  entryComponents: []
})
export class AppModule {

  ngDoBootstrap() { }

}
