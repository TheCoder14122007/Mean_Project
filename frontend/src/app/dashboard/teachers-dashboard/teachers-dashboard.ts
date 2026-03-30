import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';

@Component({
  selector: 'app-teachers-dashboard',
  imports: [CommonModule],
  templateUrl: './teachers-dashboard.html',
  styleUrl: './teachers-dashboard.scss'
})
export class TeachersDashboard implements OnInit {
  teachers: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  editingTeacher: any = null;

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.api.getTeachers().subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response && Array.isArray(response)) {
          this.teachers = response;
        } else {
          this.teachers = [];
          this.errorMessage = 'Invalid response format';
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        this.teachers = [];
        this.errorMessage = 'Failed to load teachers. Please try again.';
        console.error('Error loading teachers:', err);
      }
    });
  }

  editTeacher(teacher: any): void {
    this.editingTeacher = { ...teacher }; // Create a copy
  }

  addTeacher(teacherData: any): void {
    this.api.saveTeacher(teacherData).subscribe({
      next: (response: any) => {
        console.log('Teacher added successfully:', response);
        this.loadTeachers(); // Reload the list
      },
      error: (err: any) => {
        console.error('Error adding teacher:', err);
        this.errorMessage = 'Failed to add teacher. Please try again.';
      }
    });
  }

  updateTeacher(teacherData: any): void {
    this.api.saveTeacher(teacherData).subscribe({
      next: (response: any) => {
        console.log('Teacher updated successfully:', response);
        this.loadTeachers(); // Reload the list
      },
      error: (err: any) => {
        console.error('Error updating teacher:', err);
        this.errorMessage = 'Failed to update teacher. Please try again.';
      }
    });
  }

  deleteTeacher(teacherId: string | number): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.api.deleteTeacher(teacherId).subscribe({
        next: (response: any) => {
          console.log('Teacher deleted successfully:', response);
          this.loadTeachers(); // Reload the list
        },
        error: (err: any) => {
          console.error('Error deleting teacher:', err);
          this.errorMessage = 'Failed to delete teacher. Please try again.';
        }
      });
    }
  }
}
