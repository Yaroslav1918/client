import { Component, inject, input, OnInit, ViewChild } from "@angular/core";
import { MessageService } from "../../_services/message.service";
import { TimeagoModule } from "ngx-timeago";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: "app-member-messages",
  standalone: true,
  imports: [TimeagoModule, FormsModule],
  templateUrl: "./member-messages.component.html",
  styleUrl: "./member-messages.component.css",
})
export class MemberMessagesComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.messageService.messageThread().length);
  }
  @ViewChild("messageForm") messageForm?: NgForm;
  messageService = inject(MessageService);
  username = input.required<string>();
  messageContent = "";

  sendMessage() {
    this.messageService
      .sendMessage(this.username(), this.messageContent)
      .then(() => {
        this.messageForm?.reset();
      });
  }
}
