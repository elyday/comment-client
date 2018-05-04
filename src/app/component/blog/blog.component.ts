import {Component, OnInit} from '@angular/core';
import {BlogInformation} from '../../models/BlogInformation';
import {BlogInformationService} from '../../service/blog-information.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
  public blogInformation: BlogInformation[] = [];
  public singleBlogInformation: BlogInformation;

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
      },
      error => {
        this.blogInformation = null;
        refreshBtn.removeAttribute('disabled');
        refreshBtn.innerText = 'Aktualisieren';
        console.log(error);
      });
  }

  public openEditModal(content, information: BlogInformation) {
    this.singleBlogInformation = information;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      console.log(this.singleBlogInformation);
    }, (reason) => {
      console.log(reason);
    });
  }

  public openDeleteModal(content, information: BlogInformation) {
    this.singleBlogInformation = information;
    this.modalService.open(content);
  }

}
