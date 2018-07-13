import {Component, OnInit} from '@angular/core';
import {CommentWebservice} from '../../service/comment-webservice.service';
import {Comment} from '../../models/Comment';
import {HttpErrorResponse} from '@angular/common/http';
import {HandleError} from '../../helper/handleError';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Filter} from '../../models/Filter';
import {FilterService} from '../../service/filter.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent extends HandleError implements OnInit {
  private originalComments: Comment[] = [];
  public filteredComments: Comment[] = [];
  public singleComment: Comment;
  private filter: Filter = new Filter();

  constructor(private commentService: CommentWebservice, private modalService: NgbModal, private filterService: FilterService) {
    super();
  }

  ngOnInit() {
    this.getComments();
    this.filterService.eventEmitter.on('setFilter', (filter) => {
      this.filter = filter;
      this.filterComments();
    });
  }

  getComments() {
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.setAttribute('disabled', 'disabled');
    refreshBtn.innerText = 'Lade...';

    this.commentService.getAll().subscribe(data => {
      this.originalComments = data['data'];
      this.filterComments();
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

  openEditModal(content, comment: Comment) {
    this.errorString = '';
    this.singleComment = new Comment();
    this.singleComment.hash = comment.hash;
    this.singleComment.articleHash = comment.articleHash;
    this.singleComment.authorName = comment.authorName;
    this.singleComment.authorMail = comment.authorMail;
    this.singleComment.title = comment.title;
    this.singleComment.content = comment.content;

    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result === 'save') {
        this.commentService.update(this.singleComment).subscribe(data => {
          this.submitRequest = true;
          this.getComments();
        }, (error: HttpErrorResponse) => {
          this.handleError(error);
        });
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  openDeleteModal(content, comment: Comment) {
    this.errorString = '';
    this.singleComment = new Comment();
    this.singleComment.hash = comment.hash;
    this.singleComment.articleHash = comment.articleHash;
    this.singleComment.authorName = comment.authorName;
    this.singleComment.authorMail = comment.authorMail;
    this.singleComment.title = comment.title;
    this.singleComment.content = comment.content;

    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result === 'yes') {
        this.commentService.delete(this.singleComment).subscribe(data => {
          this.submitRequest = true;
          this.getComments();
        }, (error: HttpErrorResponse) => {
          this.handleError(error);
        });
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  private filterComments() {
    console.log(this.originalComments);
    this.filteredComments = this.originalComments.filter(value => value.authorName.indexOf(this.filter.author) >= 0 &&
      value.title.indexOf(this.filter.title) >= 0 && value.hash.indexOf(this.filter.hash) >= 0);
  }

  protected handleError(error: HttpErrorResponse) {
    super.handleError(error);
    const errorMessage = error.error.data['error-code'];
    if (error.status === 404) {
      if (errorMessage === 'comment-not-found') {
        this.errorString = 'Der gewählte Kommentar wurde nicht gefunden!';
      }

    }
  }
}
