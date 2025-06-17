import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {BookService} from "../services/book.service";
import {IBook} from "../models/book.model";

@Component({
  selector: 'app-add-book-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  styleUrls: ['./add-book-dialog.component.scss'],
  templateUrl: './add-book-dialog.component.html',
})
export class AddBookDialogComponent implements OnInit{
  form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    description: [''],
    cover: [''],
  });

  isAddNewBook: boolean = true;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBook,
  ) {
    if (this.data) this.isAddNewBook = false;
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data);
      this.isAddNewBook = false;
    }
  }

  myForm: UntypedFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(this.data?.id ?? null),
    title: new UntypedFormControl(this.data?.title ?? ''),
    author: new UntypedFormControl(this.data?.author ?? ''),
    description: new UntypedFormControl(this.data?.description ?? ''),
    urlImg: new UntypedFormControl(this.data?.urlImg ?? ''),
  });

  submit() {
    if (this.myForm.valid) {
      this.data = {
        id: this.myForm.value.id || String(Date.now()),
        title: this.myForm.value.title,
        author: this.myForm.value.author,
        description: this.myForm.value.description,
        urlImg: this.myForm.value.urlImg,
      };

      this.dialogRef.close(this.data);
    }
  }
}
