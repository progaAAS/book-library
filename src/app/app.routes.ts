import { Routes } from '@angular/router';
import {HomeComponent} from "../main/home.component";
import {ProductDetailsComponent} from "../product-details/product-details.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book/:id', component: ProductDetailsComponent },
];
