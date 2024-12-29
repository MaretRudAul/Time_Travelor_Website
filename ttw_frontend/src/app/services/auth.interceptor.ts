import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Exclude signup and login endpoints
    if (request.url.endsWith('/signup/') || request.url.endsWith('/login/')) {
      return next.handle(request);
    }

    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      });
      console.log('AuthInterceptor added Authorization header:', `Token ${token}`);
    }
    return next.handle(request);
  }
}