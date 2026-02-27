import { Injectable } from '@angular/core';
import { Suggestion } from '../../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  private suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Darkmode',
      description: 'Ajouter un mode sombre pour améliorer le confort visuel des utilisateurs.',
      category: 'Technologie et services numériques',
      date: new Date(),
      status: 'en_attente',
      nbLikes: 0
    },
    {
      id: 2,
      title: 'Dashboard',
      description: 'Créer un dashboard avec statistiques afin de visualiser les informations rapidement.',
      category: 'Technologie et services numériques',
      date: new Date(),
      status: 'en_attente',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Exportpdf',
      description: 'Permettre l’exportation en PDF pour faciliter le partage et l’archivage des données.',
      category: 'Communication interne',
      date: new Date(),
      status: 'en_attente',
      nbLikes: 0
    }
  ];

  getAll(): Suggestion[] {
    return this.suggestions;
  }

  getById(id: number): Suggestion | undefined {
    return this.suggestions.find(s => s.id === id);
  }

  add(s: Suggestion): void {
    this.suggestions.push(s);
  }

  getNextId(): number {
    return this.suggestions.length
      ? Math.max(...this.suggestions.map(s => s.id)) + 1
      : 1;
  }
}