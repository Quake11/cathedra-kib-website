import { Component, OnInit } from '@angular/core';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
  NgxGalleryImageSize
} from 'ngx-gallery';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-enrollee',
  templateUrl: './enrollee.component.html',
  styleUrls: ['./enrollee.component.scss'],
  animations: [
    trigger('fadeInFromRight', [
      transition(':enter', [
        style({ opacity: 0.3, transform: 'translateX(30px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),

    trigger('fadeInFromLeft', [
      transition(':enter', [
        style({ opacity: 0.3, transform: 'translateX(-30px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class EnrolleeComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  feedbackSent: boolean;

  constructor() {}

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '700px',
        height: '630px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageInfinityMove: true,
        imageSize: NgxGalleryImageSize.Cover,
        thumbnails: true,
        imageDescription: true,
        imageSwipe: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
        previewInfinityMove: true,
        imageAutoPlayPauseOnHover: true,
        imageArrowsAutoHide: true
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '520px',
        thumbnails: false,
        imageAutoPlay: true,
        imageAutoPlayInterval: 5000
      },
      {
        breakpoint: 600,
        height: '380px'
      },
      // max-width 400
      {
        breakpoint: 480,
        height: '340px',
        imageDescription: false,
        imageAutoPlay: true
      },
      {
        breakpoint: 400,
        height: '250px',
        imageDescription: false
      },
      {
        breakpoint: 320,
        height: '220px'
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/enrollee/teachers/collective.jpg',
        medium: 'assets/enrollee/teachers/collective.jpg',
        big: 'assets/enrollee/teachers/collective.jpg',
        description: `Слева направо: Доцент кафедры ИБ - Гольчевский Юрий Валентинович;<br>
        Заведующий лабораторией кафедры ИБ, старший преподаватель - Некрасов Александр Николаевич;<br>
        Заведующий кафедрой ИБ, доцент кафедры ИБ - Носов Леонид Сергеевич;<br>
        Лаборант кафедры ИБ - Масленникова Дарья Леонидивна.
        `
      },
      {
        small: 'assets/enrollee/teachers/NosovLS.jpg',
        medium: 'assets/enrollee/teachers/NosovLS.jpg',
        big: 'assets/enrollee/teachers/NosovLS.jpg',
        description:
          'Заведующий кафедрой ИБ, доцент кафедры ИБ - Носов Леонид Сергеевич'
      },
      {
        small: 'assets/enrollee/teachers/MaslennikovaDL.jpg',
        medium: 'assets/enrollee/teachers/MaslennikovaDL.jpg',
        big: 'assets/enrollee/teachers/MaslennikovaDL.jpg',
        description: 'Лаборант кафедры ИБ - Масленникова Дарья Леонидивна'
      },
      {
        small: 'assets/enrollee/teachers/NekrasovAN.jpg',
        medium: 'assets/enrollee/teachers/NekrasovAN.jpg',
        big: 'assets/enrollee/teachers/NekrasovAN.jpg',
        description:
          'Заведующий лабораторией кафедры ИБ, старший преподаватель - Некрасов Александр Николаевич'
      }
    ];
  }

  onFeedbackSuccess(isSent: boolean) {
    this.feedbackSent = isSent;
  }
}
