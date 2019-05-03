import { Component, OnInit } from '@angular/core';
import { ProgramsService } from 'src/app/core/services/programs.service';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  programs$: Observable<any>;
  year: number;

  constructor(private programs: ProgramsService, private utils: UtilsService) {}

  ngOnInit() {
    this.programs$ = this.programs.fetch();
    this.year = this.utils.currentYear;
  }
}
