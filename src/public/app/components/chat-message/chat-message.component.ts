import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../models/Message';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input()
  message: Message;
  @Input()
  loggedUserId: number;
  isSelfMessage: boolean;

  constructor() { }

  ngOnInit() {
    this.isSelfMessage = (this.message.user.id == this.loggedUserId);
    console.log(this.isSelfMessage);
  }

}
