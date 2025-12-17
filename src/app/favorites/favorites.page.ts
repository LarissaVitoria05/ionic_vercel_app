import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html'
})
export class FavoritesPage implements OnInit {
  list: any[] = [];
  constructor(private fav: FavoritesService) {}

  async ngOnInit() {
    await this.load();
  }

  async load(){
    this.list = await this.fav.getFavorites();
  }
}
