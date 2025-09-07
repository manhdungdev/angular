import {bootstrapApplication} from '@angular/platform-browser';

import {AppComponent} from './app/app.component';
import {HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors} from "@angular/common/http";
import {tap} from "rxjs";

function loggingInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  const cloneReq = request.clone()
  cloneReq.headers.set('X-Header', 'test')
  console.log('Request: ', request)
  return next(cloneReq).pipe(tap({
    next: event => {
      if(event.type === HttpEventType.Response){
        console.log('Response: ', event)
        console.log('status: ', event.status)
        console.log('body: ', event.body)
      }
    }
  }))
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(
    withInterceptors([loggingInterceptor])
  )]
}).catch((err) => console.error(err));
