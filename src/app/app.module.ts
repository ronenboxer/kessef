import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './views/home-page/home-page.component';
import { ContactPageComponent } from './views/contact-page/contact-page.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { AppIndexComponent } from './views/app-index/app-index.component';
import { StatisticsPageComponent } from './views/statistics-page/statistics-page.component';
import { ChartPreviewComponent } from './cmps/chart-preview/chart-preview.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import { UserSignComponent } from './views/user-sign/user-sign.component';
import { HeaderComponent } from './cmps/header/header.component';
import { TransactionsComponent } from './views/transactions/transactions.component';
import { TransactionListComponent } from './cmps/transaction-list/transaction-list.component';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactPageComponent,
    ContactPreviewComponent,
    ContactListComponent,
    AppIndexComponent,
    StatisticsPageComponent,
    ChartPreviewComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    UserSignComponent,
    HeaderComponent,
    TransactionsComponent,
    TransactionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
