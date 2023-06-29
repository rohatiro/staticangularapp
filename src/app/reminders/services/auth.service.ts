import { HttpClient } from '@angular/common/http';
import { Injectable, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject( HttpClient );
  public profile!: ProfileType;

  constructor() { }

  getProfile(): Observable<Blob> {
    return this.http.get('https://graph.microsoft.com/v1.0/me/photo/$value', { responseType: 'blob'});
  }
}
