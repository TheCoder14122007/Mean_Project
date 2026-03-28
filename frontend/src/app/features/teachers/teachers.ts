import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule], // required for *ngFor in template
  templateUrl: './teachers.html',
  styleUrls: ['./teachers.scss'],
})
export class Teachers {
  teachers: any[] = [];

  constructor(private apiService: Api) {}

  ngOnInit() {
    this.getTeachers();
  }

  getTeachers() {
    this.apiService.getTeachers().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          this.teachers = response.data;
          console.log(this.teachers);
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}