import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { TokenService } from '../../token/token.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) { }

  intercept(resquest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    resquest = this.addToken(resquest);
    return next.handle(resquest);
  }

  private addToken(resquest: HttpRequest<any>): HttpRequest<any> {
    const token = this.tokenService.getToken();
    if (token){
      resquest = resquest.clone({
        setHeaders: {
          token,
        },
      });

      return resquest;
    }
    return resquest;
  }
}
