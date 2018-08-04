import {Component, OnInit} from '@angular/core';
import {Blog} from '../../models/Blog';
import {BlogInformationWebservice} from '../../service/blog-information-webservice.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';
import {HandleError} from '../../helper/handleError';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent extends HandleError implements OnInit {
  public blogInformation: Blog[] = [];
  public singleBlogInformation: Blog;
  public createMode = false;

  constructor(private blogInformationService: BlogInformationWebservice, private modalService: NgbModal) {
    super();
  }

  ngOnInit() {
    this.getBlogInformation();
  }

  public getBlogInformation() {
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.setAttribute('disabled', 'disabled');
    refreshBtn.innerText = 'Lade...';

    this.blogInformationService.getAll().subscribe(data => {
      this.blogInformation = data['data'];
      refreshBtn.removeAttribute('disabled');
      refreshBtn.innerText = 'Aktualisieren';
    }, error => {
      this.blogInformation = [];
      refreshBtn.removeAttribute('disabled');
      refreshBtn.innerText = 'Aktualisieren';
      console.log(error);
    });
  }

  public openEditModal(content, information: Blog) {
    this.createMode = false;
    this.errorString = '';
    this.singleBlogInformation = new Blog();
    this.singleBlogInformation.hash = information.hash;
    this.singleBlogInformation.name = information.name;
    this.singleBlogInformation.description = information.description;
    this.singleBlogInformation.url = information.url;

    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result === 'save') {
        this.blogInformationService.update(this.singleBlogInformation).subscribe(data => {
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

  openCreateModal(content) {
    this.createMode = true;
    this.errorString = '';
    this.singleBlogInformation = new Blog();

    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result === 'save') {
        this.blogInformationService.create(this.singleBlogInformation).subscribe(data => {
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

  public openDeleteModal(content, information: Blog) {
    this.errorString = '';
    this.singleBlogInformation = new Blog();
    this.singleBlogInformation.hash = information.hash;
    this.singleBlogInformation.name = information.name;
    this.singleBlogInformation.description = information.description;
    this.singleBlogInformation.url = information.url;

    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result === 'yes') {
        this.blogInformationService.delete(this.singleBlogInformation).subscribe(data => {
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

  protected handleError(error: HttpErrorResponse) {
    const errorMessage = error.error.data['error-code'];

    if (error.status === 404) {
      if (errorMessage === 'blog-not-found') {
        this.errorString = 'Der gewählte Blog wurde nicht gefunden!';
      }
    }

    super.handleError(error);
  }
}
