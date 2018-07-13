import {Injectable} from '@angular/core';
import {Filter} from '../models/Filter';
import {EventEmitter} from 'events';

@Injectable()
export class FilterService {

  public eventEmitter: EventEmitter = new EventEmitter();

  constructor() {
  }

  public setFilter(filter: Filter) {
    this.eventEmitter.emit('setFilter', filter);
  }

}
