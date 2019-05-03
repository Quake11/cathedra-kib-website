import {
  Component,
  OnInit,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ChangeDetectorRef
} from '@angular/core';
import { NavigationMenu } from 'src/app/app-routing.module';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChildren(MatMenu)
  menuElements: QueryList<MatMenu>;
  menuElementsArray: Array<MatMenu>;

  @ViewChildren(MatMenuTrigger)
  menuTriggerElements: QueryList<MatMenuTrigger>;

  menus: Array<MatMenu>;
  menuTriggers: Array<MatMenuTrigger>;

  menu: Array<any>;

  constructor(
    public mediaObserver: MediaObserver,
    private ref: ChangeDetectorRef
  ) {
    this.menu = NavigationMenu;

    this.mediaObserver.media$.subscribe(() => {
      this.ref.markForCheck();
    });
  }

  ngOnInit() {
    this.ref.markForCheck();
  }

  ngAfterViewInit() {
    this.menuElementsArray = this.menuElements.toArray();
    this.menus = this.menuElements.toArray();
    this.menuTriggers = this.menuTriggerElements.toArray();
  }

  overMenu(index) {
    this.menuTriggers.forEach(trigger => trigger.closeMenu());
    this.menuTriggers[index].openMenu();
  }

  leaveMenu(index) {
    this.menuTriggers[index].closeMenu();
  }

  closeAllMenus() {
    this.menuTriggers.forEach(trigger => trigger.closeMenu());
  }

  closeTrigger(trigger: MatMenuTrigger) {
    if (trigger) {
      trigger.closeMenu();
    } else {
      this.closeAllMenus();
    }
  }
}
