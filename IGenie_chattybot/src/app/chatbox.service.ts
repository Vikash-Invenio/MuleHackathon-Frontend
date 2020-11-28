import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {map} from 'rxjs/operators'
import { promise } from 'protractor';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ChatboxService {
user:any;
  result:any;
  // private baseUrl = "http://localhost:8083/getRobot?textLine=";
  dataString:any;

  constructor(private httpclient:HttpClient) { }
  
  // handleError(error: HttpErrorResponse) {
  //   let errorMessage = 'Unknown error!';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side errors
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side errors
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }
  async startRobot(): Promise<any>{
  
    return await this.httpclient.get("http://localhost:8080/getRobot",{responseType: "text"}).toPromise();
  };
 async getAsyncRobot(input:string):Promise<any>{
  return await this.httpclient.post("http://localhost:8080/chatRobot" ,input,{responseType : 'text'} ).toPromise()
  }
async login(input:string):Promise<any>{
  return await this.httpclient.post("http://localhost:8080/login",input,{responseType:'text'}).toPromise()
}
  }
 


