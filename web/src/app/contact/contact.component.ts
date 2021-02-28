import { Mail } from '../models/mail';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private _snackBar: MatSnackBar
  ) { }

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public matcher = new MyErrorStateMatcher();

  sender: string = '';
  body: string = '';
  ngOnInit(): void { }

  onSubmit() {
    if (this.sender != '' && this.body != '') {
      this.sendMessage();
    }
  }
  private sendMessage() {
    var message: Mail = new Mail();

    message.body = this.body;
    message.sender = this.sender;

    this.messageService.sendMessage(message);

    this._snackBar.open('Message sent!', 'MashaAllah!', {
      duration: 2000,
    });
    this.body = '';
    this.sender = '';
  }

  isValid(): boolean {
    return this.sender != null && this.body != null;
  }
}
