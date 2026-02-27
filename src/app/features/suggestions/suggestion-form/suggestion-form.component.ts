import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  todayStr = new Date().toISOString().substring(0, 10);

  // ✅ mêmes noms que ton HTML
  titleCtrl!: FormControl<string | null>;
  descriptionCtrl!: FormControl<string | null>;
  categoryCtrl!: FormControl<string | null>;
  dateCtrl!: FormControl<string | null>;
  statusCtrl!: FormControl<string | null>;

  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.titleCtrl = this.fb.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/^[A-Z][a-zA-Z]*$/)
    ]);

    this.descriptionCtrl = this.fb.control('', [
      Validators.required,
      Validators.minLength(30)
    ]);

    this.categoryCtrl = this.fb.control('', [Validators.required]);

    this.dateCtrl = this.fb.control({ value: this.todayStr, disabled: true });
    this.statusCtrl = this.fb.control({ value: 'en attente', disabled: true });

    this.form = this.fb.group({
      title: this.titleCtrl,
      description: this.descriptionCtrl,
      category: this.categoryCtrl,
      date: this.dateCtrl,
      status: this.statusCtrl
    });
  }

  submit() {
    if (this.form.invalid) return;
    console.log(this.form.getRawValue());
    this.router.navigate(['/suggestions']);
  }
}