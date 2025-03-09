import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private apiUrl = 'http://localhost:3000/api/topics';

  constructor(private http: HttpClient) {}

  getTopics(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTopicById(topicId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${topicId}`);
  }

  createTopic(topic: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, topic, { withCredentials: true });
  }

  deleteTopic(topicId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${topicId}`, { withCredentials: true });
  }

  updateTopic(topicId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${topicId}`, updatedData, { withCredentials: true });
  }
}
