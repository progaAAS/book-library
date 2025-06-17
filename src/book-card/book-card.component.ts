import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBook } from '../models/book.model';
import { MatCardModule } from '@angular/material/card';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BookService} from "../services/book.service";
import {AddBookDialogComponent} from "../add-book/add-book-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  @Input() book!: IBook;
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<IBook>();

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private router: Router) {}

  navigateToDetails() {
    this.router.navigate(['/book', this.book.id]);
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.delete.emit(id);
    });
  }

  updateData(book: IBook) {
    this.bookService.updateBook(book).subscribe((data) => {
      this.update.emit(data);
    });

  }

  updateBook(book: IBook) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = book;
    const dialogRef = this.dialog.open(AddBookDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      this.updateData(data);
    });

  }
}
