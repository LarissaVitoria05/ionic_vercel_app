import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookDetailsPage } from './book-details.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild([{ path: '', component: BookDetailsPage }])],
  declarations: [BookDetailsPage]
})
export class BookDetailsPageModule {}
