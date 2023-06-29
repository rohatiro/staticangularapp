import { Component, OnInit, inject } from '@angular/core';
import { items } from '../../data/table-items';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Observable, catchError, filter, of, tap } from 'rxjs';
import { EventMessage, EventType } from '@azure/msal-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from '../../components/form-modal/form-modal.component';

@Component({
  selector: 'app-my-reminders',
  templateUrl: './my-reminders.component.html',
  styleUrls: ['./my-reminders.component.css']
})
export class MyRemindersComponent implements OnInit {
  private modalService = inject( NgbModal );
  private _msalBroadcastService = inject( MsalBroadcastService );
  private formModalRef!: NgbModalRef;

  public get msalBroadcastService() {
    return this._msalBroadcastService;
  }
  public set msalBroadcastService(value) {
    this._msalBroadcastService = value;
  }
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize!: number;
  public _items:any = [];
  public numberOfPages!: number;
  
  ngOnInit(): void {
    this.collectionSize = items.length;
    this.numberOfPages = Math.round(this.collectionSize / this.pageSize);
    this.pageChange(1);
  }
  
  pageChange(page: number): void {
    this._items = items.map( (e, i) => ({ id: (i+1), ...e })).slice( (this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize );
  }

  openModal(): void {
    this.formModalRef = this.modalService.open( FormModalComponent, { size: 'xl' });
  }
}
