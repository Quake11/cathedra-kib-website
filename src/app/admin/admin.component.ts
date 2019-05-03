import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  navLinks = [
    { path: '.', label: 'Главная' },
    { path: 'users', label: 'Пользователи' },
    { path: 'groups', label: 'Группы' },
    { path: 'exams', label: 'Сессии' },
    { path: 'schedule', label: 'Расписание' },
    { path: 'news', label: 'Новости' },
    { path: 'events', label: 'События' },
    { path: 'programs', label: 'Программы' }
  ];
  activeLink = this.navLinks[0];

  constructor() {}

  ngOnInit() {}
}
