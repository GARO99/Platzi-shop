import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  imgs: string[] = [
    'assets/img/banner-1.jpg',
    'assets/img/banner-2.jpg',
    'assets/img/banner-3.jpg'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
