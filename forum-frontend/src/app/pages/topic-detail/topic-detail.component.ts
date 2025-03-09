import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { TopicService } from '../../services/topic.service';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      MatCardModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule
    ],
})
export class TopicDetailComponent implements OnInit {
  topic: any;
  comments: any[] = [];
  newComment = '';
  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private commentService: CommentService,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    const topicId = this.route.snapshot.paramMap.get('id');
    if (topicId) {
      this.topicService.getTopicById(topicId).subscribe({
        next: data => this.topic = data,
        error: err => console.error(err)
      });
      this.commentService.getCommentsByTopic(topicId).subscribe({
        next: data => this.comments = data,
        error: err => console.error(err)
      });
    }
  }
  addComment(): void {
    if (!this.newComment) return;
    const payload = { content: this.newComment, topic: this.topic._id };
    this.commentService.createComment(payload).subscribe({
      next: (res) => {
        this.comments.push(res);
        this.newComment = '';
      },
      error: err => console.error(err)
    });
  }
  deleteComment(commentId: string): void {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(comment => comment._id !== commentId);
      },
      error: err => console.error(err)
    });
  }
}