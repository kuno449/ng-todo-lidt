import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';

import de from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
registerLocaleData(de, 'de');

const routes: Routes = [
  {path: 'create', component: CreateTaskComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    NgbModule,
    BsDatepickerModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "de"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
