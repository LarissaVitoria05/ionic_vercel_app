import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { DatabaseService } from './database.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  
  constructor(private databaseService: DatabaseService) {}

  getFavorites(): Promise<Book[]> {
    return this.databaseService.getFavorites();
  }

  saveFavorite(book: Book): Promise<boolean> {
    return this.databaseService.addFavorite(book);
  }

  removeFavorite(bookNumber: number): Promise<boolean> {
    return this.databaseService.removeFavorite(bookNumber);
  }

  async isFavorite(bookNumber: number): Promise<boolean> {
    const favs = await this.getFavorites();
    return favs.some(f => f.number === bookNumber);
  }
}
