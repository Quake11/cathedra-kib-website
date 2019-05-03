import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  items: any[];

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        name: 'ГАУ РК «Центр информационных технологий»',
        img: 'assets/enrollee/companies/cit.png'
      },
      {
        name: '«Северный народный банк»',
        img: 'assets/enrollee/companies/snb.png'
      },
      { name: 'Банк ВТБ', img: 'assets/enrollee/companies/vtb.png' },
      {
        name: 'Банк «Русский стандарт»',
        img: 'assets/enrollee/companies/rsb.png'
      },
      {
        name: 'Государственный Пенсионный фонд',
        img: 'assets/enrollee/companies/pfrf.png'
      },
      {
        name: 'АО «АльфаСтрахование»',
        img: 'assets/enrollee/companies/alpha.png'
      },
      {
        name: 'ПАО «Ростелеком»',
        img: 'assets/enrollee/companies/rostelekom.png'
      },
      {
        name: 'Банк «Восточный»',
        img: 'assets/enrollee/companies/vost_bank.svg'
      },
      {
        name: 'Группа компаний InfoWatch',
        img: 'assets/enrollee/companies/InfoWatch.svg'
      },
      {
        name: 'SearchInform',
        img: 'assets/enrollee/companies/SearchInform.png'
      },
      { name: 'ElcomSoft', img: 'assets/enrollee/companies/ElcomSoft.png' },
      {
        name: 'Код Безопасности',
        img: 'assets/enrollee/companies/codbezopasnosti.png'
      },
      {
        name: 'Лаборатория Касперского',
        img: 'assets/enrollee/companies/kaspersky.png'
      },
      { name: 'Directum', img: 'assets/enrollee/companies/Directum.png' },
      {
        name: 'Positive Technologies',
        img: 'assets/enrollee/companies/PositiveTechnologies.png'
      },
      {
        name: 'ООО «Конфидент»',
        img: 'assets/enrollee/companies/confident.png'
      }
    ];
  }
}
