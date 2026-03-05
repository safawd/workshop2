import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../suggestions.service';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
  styleUrls: ['./suggestions-list.component.css']
})
export class SuggestionsListComponent implements OnInit {

  suggestions: Suggestion[] = [];
  loading = false;
  errorMsg = '';

  constructor(
    private router: Router,
    private service: SuggestionService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.errorMsg = '';

    this.service.getSuggestionsList().subscribe({
      next: (data) => {
        this.suggestions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Erreur lors du chargement des suggestions.';
        this.loading = false;
      }
    });
  }

  add(): void {
    this.router.navigate(['/suggestions/add']);
  }

  details(id: number): void {
    this.router.navigate(['/suggestions', id]);
  }

  delete(id: number): void {
    if (!confirm('Supprimer cette suggestion ?')) return;

    this.service.deleteSuggestion(id).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err)
    });
  }

  like(s: Suggestion): void {
    this.service.likeSuggestion(s).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err)
    });
  }

  update(id: number): void {
  this.router.navigate(['/suggestions/edit', id]);
}
}