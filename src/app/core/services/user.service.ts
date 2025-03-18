import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserResponse} from '../models/teacher';
import {environment} from '../../../environments/environment';

const baseUri = environment.backendUri + '/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<UserResponse[]> {
    return this.httpClient.get<UserResponse[]>(baseUri);
  }

}
