import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-edit-topic',
  standalone: true,
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ], 
})
export class EditTopicComponent implements OnInit {
  topic: any;
  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const topicId = this.route.snapshot.paramMap.get('id');
    if (topicId) {
      this.topicService.getTopicById(topicId).subscribe({
        next: data => this.topic = data,
        error: err => console.error(err)
      });
    }
  }

  onSubmit(): void {
    this.topicService.updateTopic(this.topic._id, this.topic).subscribe({
      next: () => this.router.navigate(['/topics']),
      error: err => console.error(err)
    });
  }
}
