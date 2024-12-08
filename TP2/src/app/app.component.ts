import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LessonEditFormComponent } from './lesson-edit-form/lesson-edit-form.component';
import { LessonSearchPageComponent } from './lesson-search-page/lesson-search-page.component';
import { MenuNavBarComponent } from './menu-nav-bar/menu-nav-bar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LessonEditFormComponent,
    LessonSearchPageComponent,
    MenuNavBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TP2';

  constructor() {
    console.log('AppComponent.constructor()')
  }

  ngOnInit(): void {
    console.log('AppComponent.ngOnInit()')
    throw new Error('Method not implemented.');
  }
}
