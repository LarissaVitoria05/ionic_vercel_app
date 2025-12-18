import { Component, OnDestroy } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';
import { BookService } from '../services/book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage implements OnDestroy {
  favorites: any[] = [];
  private subscription = new Subscription();

  constructor(
    private favoritesService: FavoritesService,
    private bookService: BookService,
    private navCtrl: NavController,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.loadFavorites();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadFavorites() {
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
    
    this.subscription.add(
      this.favoritesService.favorites$.subscribe(favorites => {
        this.favorites = favorites || [];
      })
    );
  }

  viewDetails(book: any) {
    if (book) {
      console.log('Navegando para detalhes com livro:', book);
      
      // Força o salvamento do livro
      this.bookService.setCurrentBook(book);
      
      // Aguarda um pouco antes de navegar
      setTimeout(() => {
        this.navCtrl.navigateForward('/book-details');
      }, 50);
    }
  }

  async removeFavorite(book: any) {
    const alert = await this.alertCtrl.create({
      header: 'Remover Favorito',
      message: `Deseja remover "${book.originalTitle || book.title}" dos favoritos?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Remover',
          handler: () => {
            const bookId = book.number || book.id;
            this.favoritesService.removeFavorite(bookId);
          }
        }
      ]
    });
    await alert.present();
  }

  async clearAllFavorites() {
    if (this.favorites.length === 0) return;
    
    const alert = await this.alertCtrl.create({
      header: 'Limpar Favoritos',
      message: 'Deseja remover todos os livros dos favoritos?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Limpar Todos',
          handler: () => {
            this.favoritesService.clearAllFavorites();
          }
        }
      ]
    });
    await alert.present();
  }
}