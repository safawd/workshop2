import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
})
export class SuggestionDetailsComponent implements OnInit {
  id!: number;

  suggestions = [
    { id: 1, title: 'Dark mode', desc: 'Add theme toggle.' },
    { id: 2, title: 'Dashboard charts', desc: 'Add charts.' },
    { id: 3, title: 'Export PDF', desc: 'Generate PDF.' },
  ];

  selected: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.selected = this.suggestions.find(s => s.id === this.id);
  }
}