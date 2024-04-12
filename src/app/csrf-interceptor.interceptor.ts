import {  HttpRequest,HttpHandler,HttpEvent,HttpHeaders,HttpClient, HttpParams,HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { DatePipe } from '@angular/common';
import { SharedService } from './service/shared.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from './service/notification.service';

@Injectable()
export class csrfInterceptorInterceptor implements HttpInterceptor {
  constructor(public datepipe: DatePipe,private SpinnerService: NgxSpinnerService, private shareservice: SharedService,private notification: NotificationService) { }
  spltvalue:any
  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
          
      if (this.shareservice.CSRFToken.value) {
        
      const userProvidedInput = request.body; 
      this.spltvalue = request.url.split('/')
      if(this.spltvalue[this.spltvalue.length - 1] !== "db_table_execute"){
      if (this.checkForHtmlTags(userProvidedInput)) {
        this.SpinnerService.hide()
        this.notification.showError("Improper input detected")
        
        return new Observable(observer => {
          observer.error(new Error('Improper input detected'));
        });
      }
    }
        
        let csrfToken: any = this.shareservice.CSRFToken.value;
        let Csrfcookie:any = this.shareservice.Csrfcookie.value;
        const csrfHeaders = request.headers
          .set('X-CSRFToken',csrfToken)
          .set('X-CSRFCookie', Csrfcookie)
         ;
        const csrfRequest = request.clone({
          headers: csrfHeaders,withCredentials: true
        });
        return next.handle(csrfRequest);
      
    }
      else  {
       
      if(request.method =='POST') {
        const userProvidedInput = request.body; 
        if (this.checkForHtmlTags(userProvidedInput)) {
          this.SpinnerService.hide()
          this.notification.showError("Improper input detected")
          return throwError('Improper input detected'); 
        }
      }
        
        const currentDateInMilliseconds: number = new Date().getTime();
        let CSRFToken = "1QkNBS7YrxGggr8nLIcd9axUnW1pP7H3IH0vSZs1LtcMYaqsYhsLhbN1sWu0Wvq2" + "." + currentDateInMilliseconds.toString()
        let CSRFCookie = "fxDIYLkEyAl9jNwDcIALFoMqn32MOxeEWojqfSFHSwRF1wOIphQjNp2xs3vnVVXD" + "." + currentDateInMilliseconds.toString()
        const hashedValue_CSRFToken = CryptoJS.AES.encrypt(CSRFToken, '1QkNBS7YrxGggr8nLIcd9axUnW1pP7H3IH0vSZs1LtcMYaqsYhsLhbN1sWu0Wvq2').toString();
        const hashedValue_CSRFCookie = CryptoJS.AES.encrypt(CSRFCookie, 'fxDIYLkEyAl9jNwDcIALFoMqn32MOxeEWojqfSFHSwRF1wOIphQjNp2xs3vnVVXD').toString();
        const csrfHeaders = request.headers
        .set('X-CSRFToken',hashedValue_CSRFToken)
        .set('X-CSRFCookie', hashedValue_CSRFCookie)
        // .set('Content-Security-Policy',cspHeader);
        const csrfRequest = request.clone({
          headers: csrfHeaders,
        });
        return next.handle(csrfRequest);
      }

  }
  input_val:any
  
 private checkForHtmlTags(input: string): boolean {
  const htmlTagRegex = /<[^>]+>/;
  try {
    this.input_val = JSON.stringify(input);
  } catch (e) {
    this.input_val = input;
  }
  let containsHtmlTags = htmlTagRegex.test(this.input_val)
  const disallowedCharacters = /[<&#$^*;?\|>]/;
  
  const containsDisallowedChars = disallowedCharacters.test(this.input_val);
  return containsHtmlTags || containsDisallowedChars;
}

};
