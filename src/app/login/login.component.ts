import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0.8, transform: 'scale(0.8)' }),
        animate('150ms', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  user$: Observable<any>;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.user$ = this.authService.user$;
  }

  smsLogin() {
    this.dialog.open(PhoneLoginComponent, {
      id: 'phone-confirm'
    });
  }

  async googleLogin() {
    await this.authService.googleLogin();
    this.router.navigate(['/']);
  }

  async signOut() {
    await this.authService.signOut();
    this.router.navigate(['/']);
  }

  printUser($event) {
    console.log($event);
  }

  printError($event) {
    console.log($event);
  }
}
