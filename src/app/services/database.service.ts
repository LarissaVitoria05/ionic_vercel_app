import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private readonly storageKey = 'harryPotterFavorites';
  private isInitialized = false;

  async initializeDatabase(): Promise<boolean> {
    try {
      if (!localStorage.getItem(this.storageKey)) {
        localStorage.setItem(this.storageKey, JSON.stringify([]));
      }
      this.isInitialized = true;
      return true;
    } catch (error) {
      this.isInitialized = false;
      throw new Error('Failed to initialize database');
    }
  }

  async addFavorite(book: Book): Promise<boolean> {
    if (!this.isInitialized) {
      await this.initializeDatabase();
    }
    
    try {
      const favorites = await this.getFavorites();
      if (!favorites.some(f => f.number === book.number)) {
        const sanitizedBook = this.sanitizeBook(book);
        favorites.push(sanitizedBook);
        localStorage.setItem(this.storageKey, JSON.stringify(favorites));
        return true;
      }
      return false;
    } catch (error) {
      throw new Error('Failed to add favorite');
    }
  }

  async getFavorites(): Promise<Book[]> {
    if (!this.isInitialized) {
      await this.initializeDatabase();
    }
    
    try {
      const json = localStorage.getItem(this.storageKey);
      if (!json) return [];
      
      const parsed = JSON.parse(json);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }

  async removeFavorite(bookNumber: number): Promise<boolean> {
    if (!this.isInitialized) {
      await this.initializeDatabase();
    }
    
    try {
      const favorites = await this.getFavorites();
      const filtered = favorites.filter(f => f.number !== bookNumber);
      localStorage.setItem(this.storageKey, JSON.stringify(filtered));
      return true;
    } catch (error) {
      throw new Error('Failed to remove favorite');
    }
  }

  private sanitizeBook(book: Book): Book {
    return {
      ...book,
      originalTitle: book.originalTitle?.replace(/[<>"'&]/g, '') || '',
      description: book.description?.replace(/[<>"'&]/g, '') || ''
    };
  }
}