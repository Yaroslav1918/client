import { PageChangedEvent, PaginationModule } from "ngx-bootstrap/pagination";
import { MembersService } from "./../../_services/members.service";
import { Component, inject, OnInit } from "@angular/core";
import { MemberCardComponent } from "../member-card/member-card.component";
import { AccountService } from "../../_services/account.service";
import { UserParams } from "../../../_models/userParams";
import { FormsModule } from "@angular/forms";
import { ButtonsModule } from "ngx-bootstrap/buttons";

@Component({
  selector: "app-member-list",
  standalone: true,
  imports: [MemberCardComponent, PaginationModule, FormsModule, ButtonsModule],
  templateUrl: "./member-list.component.html",
  styleUrl: "./member-list.component.css",
})
export class MemberListComponent implements OnInit {
  membersService = inject(MembersService);
  genderList = [
    { value: "male", display: "Males" },
    { value: "female", display: "Females" },
  ];

  ngOnInit(): void {
    if (!this.membersService.paginatedResult()) this.loadMembers();
  }

  loadMembers() {
    this.membersService.getMembers();
  }

  resetFilters() {
    this.membersService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any) {
    if (this.membersService.userParams().pageNumber !== event.page) {
      this.membersService.userParams().pageNumber = event.page;
      this.loadMembers();
    }
  }
}
