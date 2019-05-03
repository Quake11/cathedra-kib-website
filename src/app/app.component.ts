import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Inject,
  OnDestroy
} from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { MessageService } from 'primeng/api';
import { DOCUMENT } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';
import { NotificationsService } from './core/services/notifications.service';
import { PresenceService } from './core/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav')
  sidenav: MatSidenav;

  screenChange$: Observable<MediaChange>;

  message$: Observable<any>;

  constructor(
    private router: Router,
    public mediaObserver: MediaObserver,
    private ref: ChangeDetectorRef,
    private sidenavService: SidenavService,
    private utils: UtilsService,
    private notifications: NotificationsService,
    private snackBar: MatSnackBar,
    private toastMessageService: MessageService,
    @Inject(DOCUMENT) private _document: any,
    private update: SwUpdate,
    public presence: PresenceService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      if (localStorage.getItem('acceptCookies') !== 'true') {
        const sb = this.snackBar.open('Мы используем cookies 🍪', 'Понятно', {
          duration: 60000
        });

        sb.onAction().subscribe(() => {
          localStorage.setItem('acceptCookies', 'true');
        });
      }
    });

    this.pwaUpdateHandler();

    this.utils.fontSize.subscribe(size => {
      this.setHtmlFontSize(size);
    });

    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.ref.markForCheck();

      if (
        this.sidenav &&
        this.sidenav.opened &&
        change.mqAlias !== 'xs' &&
        change.mqAlias !== 'sm'
      ) {
        this.sidenav.close();
      }
    });

    this.subscribeToToastMessages();
    /*     this.auth.user$
      .pipe(
        filter(user => !!user),
        take(1) // take first real user
      )

      .subscribe(user => {
        if (user) {
          this.messagingService.getPermission(user);
          this.messagingService.monitorRefresh(user);
          this.messagingService.receiveMessages();
        }
      }); */

    this.sidenavService.sidenav = this.sidenav;
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd && this.isSmallScreen()) {
        if (this.sidenav.opened) {
          this.sidenav.close();
        }
      }
    });

    this.message$ = this.notifications.receiveMessages();

    this.message$.subscribe(message => {
      console.log(message);
      const snackBarRef = this.snackBar.open(
        message.notification.title,
        'Открыть',
        {
          duration: 20000
        }
      );

      snackBarRef
        .onAction()
        .subscribe(() =>
          this.router.navigateByUrl(message.notification.click_action)
        );

      /* console.log('Message received: '); */
    });
  }

  ngOnDestroy() {}

  pwaUpdateHandler(): void {
    this.update.available
      .pipe(takeWhile(() => this.update.isEnabled))
      .subscribe(update => {
        console.log('update: ', update);

        const sb = this.snackBar.open(
          'Доступна более новая версия сайта! Нажмите "Обновить".',
          'Обновить',
          { duration: 60000 }
        );

        sb.onAction().subscribe(() => {
          this.update.activateUpdate().then(() => document.location.reload());
        });
      });
  }

  // fot a11y with help of rem
  setHtmlFontSize(size: number) {
    this._document.documentElement.style.fontSize = `${size}px`;
  }

  isSmallScreen(): boolean {
    return this.utils.isSmallScreen();
  }

  subscribeToToastMessages() {
    this.utils.messageToastChange.subscribe(message => {
      this.toastMessageService.add({ key: 'custom', ...message });
    });
  }
}
