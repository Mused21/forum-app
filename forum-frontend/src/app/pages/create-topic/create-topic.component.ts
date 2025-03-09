import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TopicService } from '../../services/topic.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-create-topic',
  standalone: true,
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
})
export class CreateTopicComponent implements OnInit {
  topic = { title: '', content: '', category: '' };
  categories: any[] = [];
  
  constructor(
    private topicService: TopicService,
    private categoryService: CategoryService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: data => this.categories = data,
      error: err => console.error(err)
    });
  }
  
  onSubmit(): void {
    this.topicService.createTopic(this.topic).subscribe({
      next: () => this.router.navigate(['/topics']),
      error: err => console.error(err)
    });
  }
}
