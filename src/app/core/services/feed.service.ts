import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUri = environment.backendUri + '/feed';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(baseUri);
  }

  submitAttendance(courseId: number, presentStudents: { id: number; firstName: string; lastName: string }[]): Observable<any> {
    const payload = {
      courseId,
      students: presentStudents
    };

    return this.httpClient.post(baseUri, payload);
  }

  submitAttendanceAsStudent(courseId: string, sessionId: string): Observable<any> {
    const uri = `${environment.backendUri}/courses/${courseId}/sessions/${sessionId}/attendance`;
    return this.httpClient.put(uri, {}); // Send an empty object or any required body
  }

}
