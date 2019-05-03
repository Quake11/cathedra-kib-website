import { Component, OnInit, Input } from '@angular/core';
import { Module } from 'src/app/models/module.interface';

@Component({
  selector: '[skillsModuleComponent]',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {
  @Input()
  module: Module;
  constructor() {}

  ngOnInit() {}
}
