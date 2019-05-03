import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from '../models/user.interface';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-profile-menu',
  templateUrl: './user-profile-menu.component.html',
  styleUrls: ['./user-profile-menu.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0.3, transform: 'translateY(-15px)' }),
        animate('180ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class UserProfileMenuComponent implements OnInit, OnDestroy {
  loading = true;
  sub: Subscription;

  constructor(
    private auth: AuthService,
    private users: UsersService,
    public mediaObserver: MediaObserver
  ) {}

  ngOnInit() {
    this.user$.subscribe(() => {
      this.loading = false;
    });
  }

  get user$(): Observable<User> {
    return this.auth.user$;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  signOut() {
    this.auth.signOut();
  }

  getFirstname(user: User) {
    return this.users.formatOnlyFirstname(user);
  }
}
