import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CommentService {
  private endPoint = environment.apiUrl + '/api/comment';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Comment[]>(this.endPoint);
  }

}
