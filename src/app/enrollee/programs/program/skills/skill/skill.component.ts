import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[skillComponent]',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  @Input()
  skill: any;

  constructor() {}

  ngOnInit() {}
}
