import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl:string="http://localhost:4000/";
  constructor(private http:HttpClient) { }
  // get all contact Data
  public getAllContacts():Observable<MyContact>{
    let dataUrl:string=`${this.baseUrl}contact`;
    return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError))
  }
  // get single data
  public getContacts(contactId:string):Observable<MyContact>{
    let dataUrl:string=`${this.baseUrl}contact/${contactId}`;
    return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError));
  }
  //create data
  public createContact(contact:MyContact):Observable<MyContact>{
    let dataUrl:string=`${this.baseUrl}contact`;
    return this.http.post<MyContact>(dataUrl,contact).pipe(catchError(this.handleError))
  }
  //update data
  public updateContact(contact:MyContact, contactId:string):Observable<MyContact>{
    let dataUrl:string=`${this.baseUrl}contact/${contactId}`;
    return this.http.put<MyContact>(dataUrl,contact).pipe(catchError(this.handleError))
  }
  //delete data
  public deleteContact(contactId:string):Observable<MyContact>{
    let dataUrl:string=`${this.baseUrl}contact/${contactId}`;
    return this.http.delete<MyContact>(dataUrl).pipe(catchError(this.handleError))
  }

  // get all group
  public getAllgroups():Observable<MyGroup>{
    let dataUrl:string=`${this.baseUrl}groups`;
    return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError));
  }
  // get single group
  public getgroups(contact:MyContact):Observable<MyGroup>{
    let dataUrl:string=`${this.baseUrl}groups/${contact.groupId}`;
    return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError));
  }

  //error solve
  public handleError(error:HttpErrorResponse){
    var errorMassege:string='';
    if(error.error instanceof ErrorEvent){
      errorMassege=`Error: ${error.error.message}`;
    }else{
      errorMassege=`Status: ${error.status} \n Massage :${error.message}`
    }
    return throwError(errorMassege)
  }
}
