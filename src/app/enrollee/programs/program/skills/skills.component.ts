import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Skill } from 'src/app/models/skill.interface';
import { Practice } from 'src/app/models/practice.interface';
import { Module } from 'src/app/models/module.interface';

@Component({
  selector: '[skillsComponent]',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnChanges {
  @Input()
  skills: Array<Skill>;

  @Input()
  practices: Array<Practice>;

  @Input()
  modules: Array<Module>;

  @Input()
  preview: boolean;

  years: Array<string> = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.countYears();
  }

  countYears() {
    this.years = [];
    if (this.skills) {
      this.skills.map(skill => {
        if (skill.year && !this.years.includes(skill.year)) {
          this.years.push(skill.year);
        }
      });
    }
    if (this.practices) {
      this.practices.map(practice => {
        if (practice.year && !this.years.includes(practice.year)) {
          this.years.push(practice.year);
        }
      });
    }

    if (this.modules) {
      this.modules.map(module => {
        if (module.year && !this.years.includes(module.year)) {
          this.years.push(module.year);
        }
      });
    }

    this.years.sort();
  }

  getHardSkills(year: number) {
    if (!this.skills) {
      return null;
    }
    return this.skills.filter(
      skill => skill.type === 'hard' && skill.year === year.toString()
    );
  }

  getSoftSkills(year: number) {
    if (!this.skills) {
      return null;
    }
    return this.skills.filter(
      skill => skill.type === 'soft' && skill.year === year.toString()
    );
  }

  getPractices(year: number) {
    if (!this.practices) {
      return null;
    }
    return this.practices.filter(practice => practice.year === year.toString());
  }

  getModules(year: number) {
    if (!this.modules) {
      return null;
    }
    return this.modules.filter(module => module.year === year.toString());
  }
}
