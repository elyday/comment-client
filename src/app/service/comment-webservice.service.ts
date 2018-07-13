import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Comment} from '../models/Comment';

@Injectable()
export class CommentWebservice {
  private endPoint = environment.apiUrl + '/api/comment';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Comment[]>(this.endPoint);
  }

  update(comment: Comment) {
    return this.http.put(this.endPoint, comment);
  }

  delete(comment: Comment) {
    return this.http.delete(this.endPoint + '/' + comment.hash);
  }

}
