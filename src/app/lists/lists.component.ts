import { ButtonsModule } from "ngx-bootstrap/buttons";
import { LikesService } from "./../_services/likes.service";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MemberCardComponent } from "../members/member-card/member-card.component";
import { PaginationModule } from "ngx-bootstrap/pagination";

@Component({
  selector: "app-lists",
  standalone: true,
  imports: [ButtonsModule, FormsModule, MemberCardComponent, PaginationModule],
  templateUrl: "./lists.component.html",
  styleUrl: "./lists.component.css",
})
export class ListsComponent implements OnInit, OnDestroy {
  likesService = inject(LikesService);
  predicate = "liked";
  pageNumber = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadLikes();
    console.log(
      "likesService.paginatedResult()?.pagination",
      this.likesService.paginatedResult()?.pagination
    );
  }

  getTitle() {
    switch (this.predicate) {
      case "liked":
        return "Members you like";
      case "likedBy":
        return "Members who you like";
      default:
        return "Mutual";
    }
  }

  loadLikes() {
    this.likesService.getLikes(this.predicate, this.pageNumber, this.pageSize);
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.type;
      this.loadLikes();
    }
  }

  ngOnDestroy(): void {
    this.likesService.paginatedResult.set(null);
  }
}
