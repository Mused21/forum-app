import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { TopicService } from '../../services/topic.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
})
export class TopicListComponent implements OnInit {
  topics: any[] = [];

  constructor(
    public authService: AuthService,
    private topicService: TopicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.topicService.getTopics().subscribe({
      next: topics => this.topics = topics,
      error: err => console.error(err)
    });
  }

  viewTopic(id: string): void {
    this.router.navigate(['/topics', id]);
  }

  editTopic(id: string): void {
    this.router.navigate(['/edit-topic', id]);
  }

  deleteTopic(id: string): void {
    this.topicService.deleteTopic(id).subscribe({
      next: () => {
        this.topics = this.topics.filter(topic => topic._id !== id);
      },
      error: err => console.error(err)
    });
  }
}
