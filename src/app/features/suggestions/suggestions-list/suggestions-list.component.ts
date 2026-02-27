import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuggestionsService } from '../suggestions.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
  styleUrls: ['./suggestions-list.component.css']
})
export class SuggestionsListComponent {

  suggestions: Suggestion[] = [];

  constructor(private router: Router, private suggestionsService: SuggestionsService) {
    this.suggestions = this.suggestionsService.getAll();
  }

  details(id: number) {
    this.router.navigate(['/suggestions', id]);
  }
}