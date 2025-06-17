import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IBook } from '../models/book.model';

@Component({
  selector: 'app-add-book-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  styleUrls: ['./add-book-dialog.component.scss'],
  templateUrl: './add-book-dialog.component.html',
})
export class AddBookDialogComponent implements OnInit {
  isAddNewBook = true;

  myForm: UntypedFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    title: new UntypedFormControl('', Validators.required),
    author: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl(''),
    urlImg: new UntypedFormControl(''),
  });

  constructor(
    private dialogRef: MatDialogRef<AddBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBook
  ) {
    if (this.data) this.isAddNewBook = false;
  }

  ngOnInit(): void {
    if (this.data) {
      this.myForm.patchValue(this.data);
    }
  }

  submit() {
    if (this.myForm.valid) {
      this.dialogRef.close({
        id: this.myForm.value.id || String(Date.now()),
        ...this.myForm.value,
      });
    }
  }
}
