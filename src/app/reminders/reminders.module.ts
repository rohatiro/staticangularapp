import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemindersRoutingModule } from './reminders-routing.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MyRemindersComponent } from './pages/my-reminders/my-reminders.component';
import { NgbModal, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    MyRemindersComponent,
    PaginatorComponent,
    FormModalComponent
  ],
  imports: [
    CommonModule,
    RemindersRoutingModule,
    NgbPaginationModule,
    NgbModalModule
  ]
})
export class RemindersModule { }
