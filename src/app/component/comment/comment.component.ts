import {Component, OnInit} from '@angular/core';
import {CommentService} from '../../service/comment.service';
import {Comment} from '../../models/Comment';
import {HttpErrorResponse} from '@angular/common/http';
import {HandleError} from '../../helper/handleError';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent extends HandleError implements OnInit {
  public comments: Comment[] = [];
  public singleComment: Comment;

  constructor(private commentService: CommentService, private modalService: NgbModal) {
    super();
  }

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.setAttribute('disabled', 'disabled');
    refreshBtn.innerText = 'Lade...';

    this.commentService.getAll().subscribe(data => {
      this.comments = data['data'];
      refreshBtn.removeAttribute('disabled');
      refreshBtn.innerText = 'Aktualisieren';
    }, error => {
      this.handleError(error);
      refreshBtn.removeAttribute('disabled');
      refreshBtn.innerText = 'Aktualisieren';
    });
  }

  openDetailModal(content, comment: Comment) {
    this.singleComment = new Comment();
    this.singleComment.hash = comment.hash;
    this.singleComment.articleHash = comment.articleHash;
    this.singleComment.authorName = comment.authorName;
    this.singleComment.authorMail = comment.authorMail;
    this.singleComment.title = comment.title;
    this.singleComment.content = comment.content;

    this.modalService.open(content, {size: 'lg'});
  }

  protected handleError(error: HttpErrorResponse) {
    const errorMessage = error.error.data['error-code'];

    if (error.status === 404) {
      if (errorMessage === 'comment-not-found') {
        this.errorString = 'Der gewählte Kommentar wurde nicht gefunden!';
      }
    }

    super.handleError(error);
  }
}
