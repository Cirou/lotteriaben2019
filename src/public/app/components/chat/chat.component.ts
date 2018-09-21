import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../models/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input()
  messages: Message[];

  constructor() { }

  ngOnInit() {
  }

  sendMessage(){
    
  }

}
