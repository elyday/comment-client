import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BlogInformation} from '../models/BlogInformation';

@Injectable()
export class BlogInformationService {
  private endPoint = environment.apiUrl + '/api/blog';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<BlogInformation[]>(this.endPoint);
  }

  getByHash(hash: string) {
    return this.http.get<BlogInformation>(this.endPoint + '/' + hash);
  }

  create(blogInformation: BlogInformation) {
    return this.http.post(this.endPoint + '/add', blogInformation);
  }

  update(blogInformation: BlogInformation) {
    return this.http.put(this.endPoint + '/edit/' + blogInformation.hash, blogInformation);
  }

  delete(blogInformation: BlogInformation) {

  }


}