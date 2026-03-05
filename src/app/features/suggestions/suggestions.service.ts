import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suggestion } from '../../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private suggestionUrl = 'http://localhost:3000/suggestions';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }

  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<Suggestion>(`${this.suggestionUrl}/${id}`);
  }

  addSuggestion(s: Omit<Suggestion, 'id'>): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.suggestionUrl, s, this.httpOptions);
  }

  deleteSuggestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.suggestionUrl}/${id}`);
  }

  updateSuggestion(id: number, s: Partial<Suggestion>): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.suggestionUrl}/${id}`, s, this.httpOptions);
  }

  likeSuggestion(s: Suggestion): Observable<Suggestion> {
    const updated = { ...s, nbLikes: (s.nbLikes ?? 0) + 1 };
    return this.updateSuggestion(s.id, updated);
  }
}