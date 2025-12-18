import { Component, OnDestroy } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { BookService } from '../services/book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnDestroy {
  book: any;
  isLoading = false;
  private subscription = new Subscription();

  constructor(
    private nav: NavController,
    private router: Router,
    private bookService: BookService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    if (!this.book) {
      this.loadRandomBook();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async loadRandomBook() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
    
    this.subscription.add(
      this.bookService.loadRandomBook().subscribe({
        next: (book) => {
          this.book = book;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar livro:', error);
          this.isLoading = false;
          this.showErrorMessage();
        }
      })
    );
  }

  openDetails() {
    if (this.book) {
      console.log('Navegando para detalhes com livro:', this.book);
      
      // Força o salvamento do livro
      this.bookService.setCurrentBook(this.book);
      
      // Aguarda um pouco antes de navegar
      setTimeout(() => {
        this.nav.navigateForward('/book-details');
      }, 50);
    }
  }

  refreshBook() {
    this.loadRandomBook();
  }

  getDescriptionPreview(): string {
    if (!this.book) return '';
    
    const description = this.book.description_pt || this.book.description || '';
    const maxLength = 150;
    
    if (description.length <= maxLength) {
      return description;
    }
    
    return description.substring(0, maxLength).trim();
  }

  private async showErrorMessage() {
    const toast = await this.toastCtrl.create({
      message: 'Erro ao carregar livro. Tente novamente.',
      duration: 3000,
      position: 'bottom',
      color: 'danger',
      buttons: [
        {
          text: 'Tentar Novamente',
          handler: () => {
            this.loadRandomBook();
          }
        }
      ]
    });
    await toast.present();
  }
}