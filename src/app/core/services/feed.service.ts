import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUri = environment.backendUri + 'feed';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(baseUri);
  }

  getAttendance(courseId: string, sessionId: string): Observable<any> {
    const uri = `${environment.backendUri}/courses/${courseId}/sessions/${sessionId}`;
    return this.httpClient.get<any>(uri);
  }

  submitAttendanceAsTeacher(courseId: string, sessionId: string, attendanceData: { userId: string, kind: string }[] ): Observable<any> {
    const uri = `${environment.backendUri}/courses/${courseId}/sessions/${sessionId}/attendance`;
    return this.httpClient.put(uri, attendanceData);
  }

  submitAttendanceAsStudent(courseId: string, sessionId: string, attendanceData: { kind: string }[]): Observable<any> {
    const uri = `${environment.backendUri}/courses/${courseId}/sessions/${sessionId}/attendance`;
    return this.httpClient.put(uri, attendanceData);
  }

}
