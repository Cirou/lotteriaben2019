import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../models/Message';
import { RootService } from '../../services/root.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input()
  messages: Message[];
  loggedUserId: number;

  constructor(private rootService: RootService) { }

  ngOnInit() {
    this.loggedUserId = Number(this.rootService.loggedUserId);
  }

  sendMessage(){
    
  }

}
