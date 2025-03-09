import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule
  ],
})
export class AdminPanelComponent implements OnInit {
  newCategory = { name: '', description: '' };
  categories: any[] = [];
  users: any[] = [];
  displayedCategoryColumns: string[] = ['name', 'description', 'actions'];
  displayedUserColumns: string[] = ['username', 'role', 'actions'];

  constructor(
    private categoryService: CategoryService, 
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadUsers();
  }
  
  addCategory(): void {
    if (!this.newCategory.name) {
      this.snackBar.open('Category name is required.', 'Close', { duration: 3000 });
      return;
    }
    this.categoryService.createCategory(this.newCategory).subscribe({
      next: res => {
        this.snackBar.open('Category added successfully!', 'Close', { duration: 3000 });
        this.newCategory = { name: '', description: '' };
        this.loadCategories();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Failed to add category', 'Close', { duration: 3000 });
      }
    });
  }
  
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: data => this.categories = data,
      error: err => console.error(err)
    });
  }

  deleteCategory(categoryId: string): void {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.snackBar.open('Category deleted successfully!', 'Close', { duration: 3000 });
        this.loadCategories();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Failed to delete category', 'Close', { duration: 3000 });
      }
    });
  }
  
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: data => this.users = data,
      error: err => console.error(err)
    });
  }
  
  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(user => user._id !== userId);
        this.snackBar.open('User deleted successfully!', 'Close', { duration: 3000 });
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Failed to delete user', 'Close', { duration: 3000 });
      }
    });
  }
}