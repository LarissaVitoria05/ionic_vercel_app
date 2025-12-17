
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  book: any;

  constructor(private http: HttpClient, private nav: NavController) {}

  ngOnInit() {
    this.http.get('https://potterapi-fedeperin.vercel.app/en/books/random')
      .subscribe(res => this.book = res);
  }

  openDetails() {
    this.nav.navigateForward('/book-details', { state: { book: this.book } });
  }
}
