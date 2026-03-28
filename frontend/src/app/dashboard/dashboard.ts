import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactDashboard } from './contact-dashboard/contact-dashboard';
import { EventsDashboard } from './events-dashboard/events-dashboard';
import { GalleryDashboard } from './gallery-dashboard/gallery-dashboard';
import { NoticeDashboard } from './notice-dashboard/notice-dashboard';
import { TeachersDashboard } from './teachers-dashboard/teachers-dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ContactDashboard,
    EventsDashboard,
    GalleryDashboard,
    NoticeDashboard,
    TeachersDashboard
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {

  selectedMenu: any = 'contact';

}