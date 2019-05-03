import { Component, OnInit } from '@angular/core';
import {
  style,
  trigger,
  state,
  animate,
  transition,
  stagger,
  query
} from '@angular/animations';
import { NavigationMenu } from 'src/app/app-routing.module';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('fade', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(25px)' }),
            stagger(
              '150ms',
              animate(
                '250ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class NavigationComponent implements OnInit {
  menu: Array<any>;

  constructor() {
    this.menu = NavigationMenu;
  }

  ngOnInit() {}
}
