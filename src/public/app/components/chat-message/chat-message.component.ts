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
  loggedUser = {id:1};

  constructor() { }

  ngOnInit() {
  }

}