import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProgramsService } from 'src/app/core/services/programs.service';
import { Program } from 'src/app/models/program.interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],

  animations: [
    trigger('fadeInFromTop', [
      transition(':enter', [
        style({ opacity: 0.5, transform: 'scale(0.95) translateY(-15px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'scale(1)  translateY(0)' })
        )
      ])
    ]),
    trigger('fadeInFromLeftSlow', [
      transition(':enter', [
        style({ opacity: 0.5, transform: 'scale(0.95) translateX(-50px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'scale(1) translateX(0)' })
        )
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0.6 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeInGraduate', [
      transition(':enter', [
        style({ opacity: 0.8, transform: 'scale(0.95)' }),
        animate('600ms', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class ProgramComponent implements OnInit, OnDestroy {
  @Input()
  preview: Program;

  program$: Observable<Program>;

  year: number;

  skills$: Observable<any>;

  id: string;
  routeSub: Subscription;

  currentGraduate = 0;

  background: SafeStyle;

  graduates = [
    {
      name: 'Иванов В.В.',
      photoUrl:
        'https://timedotcom.files.wordpress.com/2017/12/joey-degrandis-hsam-memory.jpg',
      comment:
        'Не следует, однако забывать, что укрепление и развитие структуры позволяет выполнять важные задания по разработке системы обучения кадров, соответствует насущным потребностям. Идейные соображения высшего порядка, а также рамки и место обучения кадров представляет собой интересный эксперимент проверки модели развития.',
      job: 'Positive Technologies',
      post: 'Специалист безопасности'
    },
    {
      name: 'Петров А.В.',
      photoUrl:
        'https://i0.wp.com/techunlimitedllc.com/wp-content/uploads/2018/07/Chad-2018SMall-637x637.png',
      comment:
        'Не следует, однако забывать, что укрепление и развитие структуры позволяет выполнять важные задания по разработке системы обучения кадров, соответствует насущным потребностям. Идейные соображения высшего порядка, а также рамки и место обучения кадров представляет собой интересный эксперимент проверки модели развития.',
      job: 'Лаборатория Касперского',
      post: 'Этичный хакер'
    }
  ];

  constructor(
    private utils: UtilsService,
    private route: ActivatedRoute,
    private programs: ProgramsService,
    private sanitization: DomSanitizer
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.program$ = this.programs.getById(this.id);
    });

    this.year = this.utils.currentYear;
  }

  getBackground(back: string) {
    return this.sanitization.bypassSecurityTrustStyle(back);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  changeSlide(index: number) {
    const nextIndex = this.currentGraduate + index;
    if (nextIndex >= this.graduates.length) {
      return (this.currentGraduate = 0);
    }

    if (nextIndex < 0) {
      return (this.currentGraduate = this.graduates.length - 1);
    }

    this.currentGraduate = nextIndex;
  }
}
