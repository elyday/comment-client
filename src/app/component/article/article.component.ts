import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogInformationWebservice} from "../../service/blog-information-webservice.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Blog} from "../../models/Blog";
import {Article} from "../../models/Article";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ArticleWebservice} from "../../service/article-webservice.service";
import {HandleError} from "../../helper/handleError";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styles: []
})
export class ArticleComponent extends HandleError implements OnInit, OnDestroy {

  private hash: string;
  private sub: Subscription;
  public blogInformation: Blog;
  public articleList: Article[] = [];
  public singleArticle: Article;
  public createMode = false;

  constructor(private route: ActivatedRoute, private blogInformationService: BlogInformationWebservice, private articleService: ArticleWebservice, private modalService: NgbModal) {
    super();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(value => this.hash = value["hash"]);
    this.getBlogInformation();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getBlogInformation() {
    ArticleComponent.disableRefreshButton();

    this.blogInformationService.getByHash(this.hash).subscribe(data => {
      this.blogInformation = data['data'];
      ArticleComponent.activateRefreshButton();
      this.getArticleList();
    }, error => {
      this.blogInformation = null;
      this.articleList = [];
      ArticleComponent.activateRefreshButton();
      console.log(error);
    });
  }

  public getArticleList() {
    ArticleComponent.disableRefreshButton();

    this.articleService.getByBlog(this.hash).subscribe(data => {
      this.articleList = data['data'];
      ArticleComponent.activateRefreshButton();
    }, error1 => {
      this.articleList = [];
      ArticleComponent.activateRefreshButton();
      console.log(error1)
    });
  }

  public openEditModal(content, information: Article) {
    this.createMode = false;
    this.errorString = '';
    this.singleArticle = new Article();
    this.singleArticle.hash = information.hash;
    this.singleArticle.title = information.title;
    this.singleArticle.author = information.author;
    this.singleArticle.url = information.url;

    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result === 'save') {
        this.articleService.update(this.singleArticle).subscribe(data => {
          this.submitRequest = true;
          this.getBlogInformation();
          this.submitRequest = true;
        }, (error: HttpErrorResponse) => {
          this.handleError(error);
        });
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  public openCreateModal(content) {
    this.createMode = true;
    this.errorString = '';
    this.singleArticle = new Article();
    this.singleArticle.blogHash = this.hash;

    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result === 'save') {
        this.articleService.create(this.singleArticle).subscribe(data => {
          this.submitRequest = true;
          this.getBlogInformation();
        }, (error: HttpErrorResponse) => {
          this.handleError(error);
        });
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  public openDeleteModal(content, information: Article) {
    this.errorString = '';
    this.singleArticle = new Article();
    this.singleArticle.hash = information.hash;
    this.singleArticle.title = information.title;
    this.singleArticle.author = information.author;
    this.singleArticle.url = information.url;

    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result === 'yes') {
        this.articleService.delete(this.singleArticle).subscribe(data => {
          this.submitRequest = true;
          this.getBlogInformation();
        }, error => {
          this.handleError(error);
        });
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  private static disableRefreshButton() {
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn !== null) {
      refreshBtn.setAttribute('disabled', 'disabled');
      refreshBtn.innerText = 'Lade...';
    }
  }

  private static activateRefreshButton() {
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn !== null) {
      refreshBtn.removeAttribute('disabled');
      refreshBtn.innerText = 'Aktualisieren';
    }
  }

}
