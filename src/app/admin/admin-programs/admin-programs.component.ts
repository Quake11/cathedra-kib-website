import { Component, OnInit } from '@angular/core';
import { ProgramsService } from 'src/app/core/services/programs.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Program } from 'src/app/models/program.interface';

@Component({
  selector: 'app-admin-programs',
  templateUrl: './admin-programs.component.html',
  styleUrls: ['./admin-programs.component.scss']
})
export class AdminProgramsComponent implements OnInit {
  programs$: Observable<Array<Program>>;
  id: string;

  constructor(
    private programs: ProgramsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.programs$ = this.programs.fetch();
    /*
    this.route.url.subscribe(url => console.log(url));

    if (this.route.firstChild && this.route.firstChild.params) {
      this.route.firstChild.params.subscribe(params => {
        this.id = params['id'];
      });
    } else {
      this.id = null;
    } */
  }
}
