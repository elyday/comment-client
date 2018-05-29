import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comment-filter',
  templateUrl: './comment-filter.component.html',
  styles: []
})
export class CommentFilterComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openFilterModal(content) {
    this.modalService.open(content, {size: 'lg'});
  }

}
