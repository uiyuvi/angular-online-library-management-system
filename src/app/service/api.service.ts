import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, catchError } from 'rxjs';
import { Member } from '../models/member'

@Injectable()
export class ApiService {

  base_url: string;
  item: BehaviorSubject<object>
  isEdit: BehaviorSubject<boolean>

  constructor(private http: HttpClient) {
    this.base_url = "api";
    this.item = new BehaviorSubject<object>({});
    this.isEdit = new BehaviorSubject<boolean>(false);
   }

  getMembers(): Observable<Member[]> {
    let postURL = '/memberList';
  	return this.http.get<Member[]>(this.base_url + postURL).pipe(
      catchError(this.handleError)
    );;
  }

  addMember(member:Member): Observable<any> {
    let postURL = '/memberList';
  	return this.http.post(this.base_url + postURL,member).pipe(
      catchError(this.handleError)
    );;
  }
  
  updateMember(member:Member): Observable<any> {
    let postURL = '/memberList/';
    return this.http.put(this.base_url + postURL + member.id,member)
    .pipe(
      catchError(this.handleError)
    );;
  }

  deleteMember(id: string): Observable<any> {
    let postURL = '/memberList/';
    return this.http.delete(this.base_url + postURL + id)
    .pipe(
      catchError(this.handleError)
    );;
  }

  setFormValue(value: any) {
    this.item.next(value);
    this.isEdit.next(true);
  };

  clearFormValue() {
    this.item.next({});
    this.isEdit.next(false);
  }

  getFormValue(): Observable<any> {
    return this.item;
  }; 

  getFormStatus(): Observable<any> {
    return this.isEdit;
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return throwError(() => new Error(error));
  }

}
