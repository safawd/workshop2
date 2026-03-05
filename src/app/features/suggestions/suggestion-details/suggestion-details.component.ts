import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../suggestions.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {

  id!: number;
  suggestion?: Suggestion;
  loading = false;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SuggestionService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.load();
  }

  load(): void {
    this.loading = true;
    this.errorMsg = '';

    this.service.getSuggestionById(this.id).subscribe({
      next: (data) => {
        this.suggestion = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = "Impossible de charger les détails.";
        this.loading = false;
      }
    });
  }

  back(): void {
    this.router.navigate(['/suggestions']);
  }

  delete(): void {
    if (!this.id) return;

    this.service.deleteSuggestion(this.id).subscribe({
      next: () => this.router.navigate(['/suggestions']),
      error: (err) => console.error(err)
    });
  }
}