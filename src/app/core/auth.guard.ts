import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { UtilsService } from './services/utils.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private utils: UtilsService,
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    // console.log('AuthGuard');

    return this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('not authenticated!');
          this.utils.addSingleToast({
            severity: 'info',
            summary: 'Вы не авторизованы',
            detail: 'Эта страница только для авторизованных пользователей'
          });
          this.router.navigate(['/login']);
        } else {
          // console.log('access granted - authenticated');
          return true;
        }
      })
    );
  }
}
