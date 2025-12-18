import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TranslationService } from './translation.service';

@Injectable({ providedIn: 'root' })
export class BookService {
  private currentBookSubject = new BehaviorSubject<any>(this.loadFromStorage());
  public currentBook$ = this.currentBookSubject.asObservable();

  constructor(
    private http: HttpClient,
    private translationService: TranslationService
  ) {}

  private loadFromStorage(): any {
    try {
      const stored = localStorage.getItem('current_book');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private saveToStorage(book: any): void {
    try {
      localStorage.setItem('current_book', JSON.stringify(book));
    } catch (error) {
      console.error('Erro ao salvar livro:', error);
    }
  }

  loadRandomBook(): Observable<any> {
    return this.http.get<any>(environment.apiUrl).pipe(
      map((book: any) => {
        const processedBook = {
          ...book,
          id: book.number || book.id || Date.now(),
          title: book.title || book.originalTitle || 'Sem título',
          originalTitle: book.originalTitle || book.title || 'Sem título',
          description: book.description || book.summary || 'Sem descrição disponível',
          description_pt: this.translationService.translateDescription(book.description || book.summary || ''),
          cover: book.cover || '',
          pages: book.pages || 0,
          releaseDate: book.releaseDate || ''
        };
        
        this.setCurrentBook(processedBook);
        return processedBook;
      })
    );
  }

  getBookById(id: number): Observable<any> {
    const currentBook = this.getCurrentBook();
    if (currentBook && (currentBook.number === id || currentBook.id === id)) {
      return new Observable(observer => {
        observer.next(currentBook);
        observer.complete();
      });
    }
    return this.loadRandomBook();
  }

  setCurrentBook(book: any): void {
    this.currentBookSubject.next(book);
    this.saveToStorage(book);
  }

  getCurrentBook(): any {
    return this.currentBookSubject.value;
  }
}