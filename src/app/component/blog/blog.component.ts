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
    console.log(localStorage.getItem('code'));
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
    this.singleBlogInformation = new BlogInformation(information.hash, information.name, information.description, information.url);
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result === 'save') {
        this.blogInformationService.update(this.singleBlogInformation).subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
        });

        // this.blogInformationService.update(this.singleBlogInformation);
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  public openDeleteModal(content, information: BlogInformation) {
    this.singleBlogInformation = information;
    this.modalService.open(content);
  }

}
