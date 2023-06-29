import { Component, OnInit, inject } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Subject, catchError, filter, of, takeUntil, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  private authSerivce = inject( MsalService );
  private _msalBroadcastService = inject( MsalBroadcastService );
  private globalService = inject( AuthService );

  private readonly _destroying$ = new Subject<void>();

  public profileImg: string = '';
  
  ngOnInit(): void {
    this.globalService.getProfile().subscribe( resp => {
      this.profileImg = window.URL.createObjectURL(resp);
    });
    this._msalBroadcastService.msalSubject$
      .pipe(
        tap( (msg: EventMessage) => {
          console.log(msg);
        }),
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
        catchError( (err) => {
          console.log(err);
          return of('');
        })
      )
      .subscribe((result: EventMessage | string) => {
        console.log('1st msalBroadcast', result);
      });

    console.log('InteractionStatus');
    this._msalBroadcastService.inProgress$
      .pipe(
        tap( (msg: InteractionStatus) => {
          console.log('InteractionStatus', msg);
        }),
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        console.log("Success");
      });

    let accounts = this.authSerivce.instance.getAllAccounts();

    console.log(accounts);
  }

  login(): void {
    this.authSerivce.logoutRedirect();
  }
}
