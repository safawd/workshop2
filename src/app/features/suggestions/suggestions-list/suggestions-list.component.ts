import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
})
export class SuggestionsListComponent {
  suggestions = [
    { id: 1, title: 'Dark mode' },
    { id: 2, title: 'Dashboard charts' },
    { id: 3, title: 'Export PDF' },
  ];

  constructor(private router: Router) {}

  details(id: number) {
    this.router.navigate(['/suggestions', id]);
  }
}