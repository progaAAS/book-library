import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IBook} from "../models/book.model";
import {BookService} from "../services/book.service";
import {MatCardModule} from "@angular/material/card";

@Component({
  standalone: true,
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  imports: [
    MatCardModule
  ],
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  book!: IBook;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.bookService.getBook(id).subscribe((book) => {
      this.book = book
    });
  }

}
