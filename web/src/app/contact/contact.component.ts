import { Mail } from '../models/mail';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../shared/common.css'],
})
export class ContactComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private _snackBar: MatSnackBar
  ) {}

  sender: string;
  body: string;
  ngOnInit(): void {}

  onSubmit() {
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
