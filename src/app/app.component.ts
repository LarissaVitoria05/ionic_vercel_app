import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({ 
  selector: 'app-root', 
  template: '<ion-app><ion-router-outlet></ion-router-outlet></ion-app>' 
})
export class AppComponent implements OnInit {
  
  constructor(private dbService: DatabaseService) {}
  
  async ngOnInit() {
    await this.initializeApp();
  }
  
  async initializeApp() {
    try {
      await this.dbService.initializeDatabase();
    } catch (error) {
      console.error('Failed to initialize app:', error);
    }
  }
}