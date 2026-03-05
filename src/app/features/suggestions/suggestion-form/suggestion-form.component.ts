import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SuggestionService } from '../suggestions.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent {

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et évènements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre',
  ];

  form!: FormGroup; // ✅ on déclare, puis on initialise dans constructor

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: SuggestionService
  ) {
    // ✅ ici fb est 100% prêt
    this.form = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^[A-Z][a-zA-Z]*$/)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],

      date: [{ value: new Date().toISOString().substring(0, 10), disabled: true }],
      status: [{ value: 'en attente', disabled: true }],
    });
  }

  get title() { return this.form.get('title'); }
  get description() { return this.form.get('description'); }
  get category() { return this.form.get('category'); }

  submit(): void {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();

    this.service.addSuggestion({
      title: raw.title,
      description: raw.description,
      category: raw.category,
      date: raw.date,     // ✅ garde string yyyy-mm-dd (meilleur pour JSON/API)
      status: raw.status,
      nbLikes: 0
    }).subscribe({
      next: () => this.router.navigate(['/suggestions']),
      error: (err) => console.error(err)
    });
  }
}