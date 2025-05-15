import { DatePipe } from '@angular/common';
import { NoteService } from './../../core/services/note/note.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Inote } from '../../core/interfaces/inote';
import Swal from 'sweetalert2';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, DatePipe, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly noteService = inject(NoteService);
  noteDetails: Inote[] = [];

  ngOnInit(): void {
    this.getNotes();
  }

  noteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    content: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  updateNoteForm: FormGroup = new FormGroup({
    _id: new FormControl(null),
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    content: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  addNote() {
    if (this.noteForm.valid) {
      this.noteService.addNote(this.noteForm.value).subscribe({
        next: (res) => {
          this.noteForm.reset();
          this.getNotes();
        },
        error: (err) => {},
      });
    }
  }

  getNotes() {
    this.noteService.getUserNotes().subscribe({
      next: (res) => {
        this.noteDetails = res.notes;
      },
      error: (err) => {
        this.noteDetails = []
      },
    });
  }

  deleteNote(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.noteService.deleteNote(id).subscribe({
          next: (res) => {
            this.getNotes();
          },
          error: (err) => {},
        });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your Note has been deleted.',
          icon: 'success',
        });
      }
    });
  }

  takeValue(note: any) {
    this.updateNoteForm.patchValue(note);
    this.updateNoteForm.markAllAsTouched();
  }
  


  updateNote(id: string) {
    if (this.updateNoteForm.valid) {
      this.noteService.updateNote(id, this.updateNoteForm.value).subscribe({
        next: (res) => {
          this.getNotes();
          Swal.fire({
            icon: 'success',
            title: 'Note updated successfully!',
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to update note!',
          });
        }
      });
    }
  }
  
}
