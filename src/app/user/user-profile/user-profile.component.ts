import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/models/user.interface';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  idSub: Subscription;
  userProfile$: Observable<User>;

  user$: Observable<User>;

  // TODO: move private fields to subcollection
  constructor(
    private route: ActivatedRoute,
    private users: UsersService,
    private auth: AuthService,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.idSub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (!!id) {
        this.userProfile$ = this.users.get(id).valueChanges();
      } else {
        this.userProfile$ = this.auth.user$;
      }
    });

    this.user$ = this.auth.user$;
  }

  ngOnDestroy() {
    this.idSub.unsubscribe();
  }

  getName(user: User) {
    return this.users.formatName(user);
  }

  getRoleName(role: string): string {
    return this.utils.getRoleName(role);
  }
}
