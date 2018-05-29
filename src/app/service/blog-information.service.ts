import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Blog} from '../models/Blog';
import {ExtendedRequest} from 'extended-request';

@Injectable()
export class BlogInformationService {
  private endPoint = environment.apiUrl + '/api/blog';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Blog[]>(this.endPoint);
  }

  getByHash(hash: string) {
    return this.http.get<Blog>(this.endPoint + '/' + hash);
  }

  create(blogInformation: Blog) {
    return this.http.post(this.endPoint, blogInformation);
  }

  update(blogInformation: Blog) {
    return this.http.put(this.endPoint, blogInformation);
  }

  delete(blogInformation: Blog) {
    return this.http.delete(this.endPoint + '/' + blogInformation.hash);
  }
}
