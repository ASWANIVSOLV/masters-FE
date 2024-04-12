import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS ,HttpClientModule} from '@angular/common/http';
import { csrfInterceptorInterceptor } from './csrf-interceptor.interceptor';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResizableDirective } from './resizable.directive'
import { LoginComponent } from './login/login.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ToastrModule } from 'ngx-toastr';
import { JwtUnAuthorizedInterceptorServiceService } from './jwt-un-authorized-interceptor-service.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
@NgModule({
  declarations: [
    AppComponent,LoginComponent,ResizableDirective,AboutComponent
  ],
  imports: [
    NgIdleKeepaliveModule.forRoot(),
    ToastrModule.forRoot(),
    SharedModule, MaterialModule,BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtUnAuthorizedInterceptorServiceService,
      multi: true
    },{
      provide:MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue:{appearance:'outline'}
    }
    ,{
      provide: HTTP_INTERCEPTORS,
      useClass: csrfInterceptorInterceptor,
      multi: true,
  }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
