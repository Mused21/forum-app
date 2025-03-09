import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/api/comments';

  constructor(private http: HttpClient) {}

  getCommentsByTopic(topicId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/topic/${topicId}`);
  }

  createComment(comment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, comment, { withCredentials: true });
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${commentId}`, { withCredentials: true });
  }
}
