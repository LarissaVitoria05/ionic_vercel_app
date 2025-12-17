import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-details',
  templateUrl: './book-details.page.html'
})
export class BookDetailsPage implements OnInit {
  book: any = null;

  constructor(
    private router: Router,
    private fav: FavoritesService,
    private translation: TranslationService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.book = (nav && nav.extras && nav.extras.state && nav.extras.state['book']) || history.state['book'] || null;
  }

  async ngOnInit() {
    if (this.book && this.book.description) {
      const translated = this.translation.translateDescription(this.book.description);
      this.book.description_pt = translated;
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  async addFavorite() {
    if (this.book) {
      await this.fav.saveFavorite(this.book);
      alert('Livro adicionado aos favoritos!');
    }
  }
}