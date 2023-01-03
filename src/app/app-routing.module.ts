import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { ContactResolver } from './services/contact/contact.resolver';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import { ContactPageComponent } from './views/contact-page/contact-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { StatisticsPageComponent } from './views/statistics-page/statistics-page.component';
import { TransactionsComponent } from './views/transactions/transactions.component';
import { UserSignComponent } from './views/user-sign/user-sign.component';

const routes: Routes = [
  {
    path: 'statistics',
    component: StatisticsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    component: ContactPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'edit/:id',
        component: ContactEditComponent,
        resolve: { contact: ContactResolver },
        canActivate: [AuthGuard]
      },
      {
        path: 'edit',
        component: ContactEditComponent,
        resolve: { contact: ContactResolver },
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
    resolve: { contact: ContactResolver },
    canActivate: [AuthGuard],

    children: [
      {
        path: 'edit',
        component: ContactEditComponent,
        resolve: { contact: ContactResolver },
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sign',
    component: UserSignComponent
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
