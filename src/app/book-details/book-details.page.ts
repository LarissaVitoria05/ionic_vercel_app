import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FavoritesService } from '../services/favorites.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html'
})
export class BookDetailsPage {
  book: any = null;
  
  constructor(
    private navCtrl: NavController,
    private favoritesService: FavoritesService,
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ionViewWillEnter() {
    // Aguarda um pouco para garantir que os dados estejam disponíveis
    setTimeout(() => {
      this.book = this.bookService.getCurrentBook();
      console.log('Livro na página de detalhes:', this.book);
      this.cdr.detectChanges();
    }, 100);
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  addFavorite() {
    if (this.book) {
      this.favoritesService.addFavorite(this.book);
      alert('Livro adicionado aos favoritos!');
    }
  }
}