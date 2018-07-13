import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Article} from '../models/Article';

@Injectable()
export class ArticleWebservice {
  private endPoint = environment.apiUrl + '/api/article';

  constructor(private http: HttpClient) {
  }

  getByBlog(blogHash: string) {
    return this.http.get<Article[]>(this.endPoint + '/blog/' + blogHash);
  }

  create(article: Article) {
    return this.http.post(this.endPoint, article);
  }

  update(article: Article) {
    return this.http.put(this.endPoint, article);
  }

  delete(article: Article) {
    return this.http.delete(this.endPoint + '/' + article.hash);
  }
}
