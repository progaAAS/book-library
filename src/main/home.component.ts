import {Component, computed, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from "@angular/material/grid-list";
import { BookCardComponent } from '../book-card/book-card.component';
import {IBook} from "../models/book.model";
import {BookService} from "../services/book.service";
import {AddBookDialogComponent} from "../add-book/add-book-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {ProductDetailsComponent} from "../product-details/product-details.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BookCardComponent, MatGridListModule, MatCardModule, ProductDetailsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  books = signal<IBook[]>([]);
  query = signal('');

  filteredBooks = computed(() =>
    this.books().filter((book) =>
      book.title?.toLowerCase().includes(this.query().toLowerCase()) ||
      book.author?.toLowerCase().includes(this.query().toLowerCase())
    )
  );

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) => {
      this.books.set(books);
    });
  }

  onSearch(query: string) {
    this.query.set(query.trim().toLowerCase());
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddBookDialogComponent);

    dialogRef.afterClosed().subscribe((newBook: IBook) => {
      this.bookService.addBook(newBook).subscribe((data) => {
        this.books.update((prev) => [...prev, newBook]);
      });
    });
  }

  deleteBook(id: string) {
    this.books.update((prev) => prev.filter((b) => b.id !== id));
  }

  updateBook(data: IBook) {
    this.books.update((prev) =>
      prev.map((b) => (b.id === data.id ? data : b))
    );
  }
}
