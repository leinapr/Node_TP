import { Component } from '@angular/core';

@Component({
  selector: 'app-lesson-search-page',
  standalone: true,
  imports: [],
  templateUrl: './lesson-search-page.component.html',
  styleUrls: ['./lesson-search-page.component.css']
})
export class LessonSearchPageComponent {

  // This object will hold the search criteria
  searchCriteria = {
    title: '',
    description: '',
    category: '',
    level: '',
    tags: '',
    author: '',
    lastModifiedDate: '',
    titleOperator: 'contains',  // Default operator for title
    startDate: '',
    endDate: '',
    minValue: null,
    maxValue: null
  };

  isAdvancedSearch = false;  // Toggle for advanced search mode

  // This method will handle the search logic (for demonstration purposes, we'll just log the search criteria)
  onSubmit() {
    console.log('Search criteria:', this.searchCriteria);
  }
}
