import {Component, OnInit} from '@angular/core';
import {BlogInformation} from '../../models/BlogInformation';
import {BlogInformationService} from '../../service/blog-information.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
  public blogInformation: BlogInformation[] = [];
  public singleBlogInformation: BlogInformation;
  public createMode: boolean = false;
  public errorString: string;
  public submitRequest: boolean = false;

  constructor(private blogInformationService: BlogInformationService, private modalService: NgbModal) {
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
      this.blogInformation = null;
      refreshBtn.removeAttribute('disabled');
      refreshBtn.innerText = 'Aktualisieren';
      console.log(error);
    });
  }

  public openEditModal(content, information: BlogInformation) {
    this.createMode = false;
    this.errorString = "";
    this.singleBlogInformation = new BlogInformation();
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
    this.errorString = "";
    this.singleBlogInformation = new BlogInformation();

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

  public openDeleteModal(content, information: BlogInformation) {
    this.errorString = "";
    this.singleBlogInformation = new BlogInformation();
    this.singleBlogInformation.hash = information.hash;
    this.singleBlogInformation.name = information.name;
    this.singleBlogInformation.description = information.description;
    this.singleBlogInformation.url = information.url;

    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result === "yes") {
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

  private handleError(error: HttpErrorResponse) {
    this.submitRequest = true;
    let errorMessage = error.error.data['error-code'];

    if (error.status == 404) {
      if (errorMessage == 'blog-not-found') {
        this.errorString = "Der gewählte Blog wurde nicht gefunden!";
      } else {
        this.errorString = "Es trat ein unbekannter Fehler auf (404)!";
      }
    } else if (error.status == 400) {
      if (errorMessage == 'invalid-request') {
        this.errorString = "Der Request ist modifiziert worden!";
      } else if (errorMessage == 'request-not-found') {
        this.errorString = "Der Request wurde nicht gefunden!";
      } else {
        this.errorString = "Es trat ein unbekannter Fehler auf (400)!";
      }
    } else if (error.status == 401) {
      if (errorMessage == 'authorization-header-not-found') {
        this.errorString = "Es wurde kein Authorisierungs Header gefunden!";
      } else if (errorMessage == 'no-token-provided') {
        this.errorString = "Es wurde kein Token gefunden!";
      } else if (errorMessage == 'token-is-not-valid') {
        this.errorString = "Der Token ist nicht mehr gültig! Bitte logge dich erneut ein!";
      } else {
        this.errorString = "Es trat ein unbekannter Fehler auf (401)!";
      }
    }
  }
}
