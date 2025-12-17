import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  getRandomBook(): Observable<Book> {
    return this.http.get<any>(environment.apiUrl).pipe(
      map(res => {
        const title = res.title || 'Livro sem título';
        const id = res.id || this.generateSafeId(title);
        
        let releaseDateStr = '';
        if (res.releaseDate) {
          try {
            const date = new Date(res.releaseDate);
            releaseDateStr = isNaN(date.getTime()) ? '' : date.toLocaleDateString('pt-BR');
          } catch {
            releaseDateStr = '';
          }
        }
        
        return {
          id,
          number: res.number || 0,
          title,
          originalTitle: res.originalTitle || title,
          releaseDate: res.releaseDate,
          releaseDateStr,
          description: res.description || res.summary || '',
          pages: res.pages || 0,
          cover: res.cover || ''
        };
      })
    );
  }

  private generateSafeId(title: string): string {
    return title
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .substring(0, 50) || 'book-' + Date.now();
  }
}
