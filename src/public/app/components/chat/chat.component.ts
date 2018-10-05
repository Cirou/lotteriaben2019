import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../../../models/Message';
import { RootService } from '../../services/root.service';
import { FormControl, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { Group } from '../../../models/Group';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('chatcomponent')
  private chatContainer: ElementRef;

  @Input()
  messages: Message[];

  @Input()
  group: Group;

  loggedUserId: number;
  public messageToSend: FormControl = new FormControl('', [Validators.required]);

  constructor(private rootService: RootService, private groupService: GroupService) { }

  ngOnInit() {
    this.loggedUserId = Number(this.rootService.loggedUserId);
    this.scrollToBottom();
  }

  sendMessage() {

    let message = new Message();
    message.text = this.messageToSend.value;
    message.user = this.rootService.loggedUser;
    message.group = this.group;
    message.data = new Date();
    console.log(message);

    this.groupService.postGroupMessage(message).subscribe(
      message => {
        console.log('Messaggio inviato');
      },
      err => {
        console.log('Invio messaggio KO');
      }
    );
    this.messageToSend.setValue('');
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollToBottom();
      console.log('scrolling container');
    } catch (err) {
      console.log(err);
    }
  }

}
