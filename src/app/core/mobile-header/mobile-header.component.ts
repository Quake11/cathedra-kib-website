import { MediaObserver } from '@angular/flex-layout';
import { UtilsService } from './../services/utils.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { SidenavService } from '../services/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent implements OnInit {
  sidenav: MatSidenav;
  constructor(
    private utils: UtilsService,
    private sidenavService: SidenavService,
    public mediaObserver: MediaObserver,
    private ref: ChangeDetectorRef
  ) {
    this.mediaObserver.media$.subscribe(() => {
      this.ref.markForCheck();
    });
  }

  ngOnInit() {
    this.ref.markForCheck();
    this.sidenav = this.sidenavService.sidenav;
  }

  isSmallScreen(): boolean {
    return this.utils.isSmallScreen();
  }
}
