import { Component, OnInit, Input } from '@angular/core';
import { Messaggio } from '../../../../models/Messaggio';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input()
  message: Messaggio;
  loggedUser = {id:'1'};

  constructor() { }

  ngOnInit() {
  }

}
