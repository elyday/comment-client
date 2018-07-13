import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FilterService} from '../../service/filter.service';
import {Filter} from '../../models/Filter';

@Component({
  selector: 'app-comment-filter',
  templateUrl: './comment-filter.component.html',
  styles: []
})
export class CommentFilterComponent implements OnInit {

  public filter: Filter = new Filter();

  constructor(private modalService: NgbModal, private filterService: FilterService) {
  }

  ngOnInit() {
  }

  openFilterModal(content) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if (result === 'submit') {
        this.filterService.setFilter(this.filter);
      } else if(result === 'delete') {
        this.filterService.setFilter(new Filter());
        this.filter = new Filter();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

}
