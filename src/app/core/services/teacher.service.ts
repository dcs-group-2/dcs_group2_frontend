import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeachersPaginated} from '../models/teacher';
import {SearchDto} from '../../shared/models/search';
import {environment} from '../../../environments/environment';

const baseUri = environment.backendUri + '/teachers';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient: HttpClient) { }

  getAll(searchParam: SearchDto): Observable<TeachersPaginated> {
    const params = new HttpParams({fromObject: Object(searchParam)});
    return this.httpClient.get<TeachersPaginated>(baseUri, {params});
  }
}
