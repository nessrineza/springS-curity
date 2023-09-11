import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {AuthIntercerptorService} from "./auth-intercerptor.service";
import {loggingInterceptorService} from "./logging-interceptor.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
    providers: [{provide: HTTP_INTERCEPTORS,
    useClass: AuthIntercerptorService,
    multi: true},
      {provide: HTTP_INTERCEPTORS,
        useClass: loggingInterceptorService,
        multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}
