import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<any[]>(this.loadFromStorage());
  public favorites$ = this.favoritesSubject.asObservable();

  private loadFromStorage(): any[] {
    try {
      const stored = localStorage.getItem('hp_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
      return [];
    }
  }

  private saveToStorage(favorites: any[]): void {
    try {
      localStorage.setItem('hp_favorites', JSON.stringify(favorites));
      this.favoritesSubject.next(favorites);
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  }

  getFavorites(): any[] {
    return this.favoritesSubject.value;
  }

  addFavorite(book: any): void {
    const favorites = this.getFavorites();
    const bookId = book.number || book.id;
    
    if (!favorites.find(f => (f.number || f.id) === bookId)) {
      favorites.push({
        ...book,
        favoriteDate: new Date().toISOString()
      });
      this.saveToStorage(favorites);
    }
  }

  removeFavorite(bookId: number | string): void {
    const favorites = this.getFavorites().filter(f => (f.number || f.id) !== bookId);
    this.saveToStorage(favorites);
  }

  isFavorite(bookId: number | string): boolean {
    return this.getFavorites().some(f => (f.number || f.id) === bookId);
  }

  clearAllFavorites(): void {
    this.saveToStorage([]);
  }
}
