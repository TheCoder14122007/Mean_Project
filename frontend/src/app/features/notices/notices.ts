import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './notices.html',
  styleUrls: ['./notices.scss']
})
export class Notices implements OnInit {

  notices: string = 'Loading notices...';

  constructor(private apiService: Api) {}

  ngOnInit() {
    this.getNotices();
  }

  getNotices() {
    this.apiService.getNotices().subscribe({
      next: (response: any) => {
        if (response && response.status === 'Y' && Array.isArray(response.data)) {

          const noticeArray = response.data
            .map((item: any) => item.title || '')
            .filter((title: string) => title);

          this.notices = noticeArray.length
            ? noticeArray.join(', ')
            : 'No notices available.';

          console.log(this.notices);

        } else {
          this.notices = 'No notices available.';
        }
      },
      error: (error: any) => {
        console.error('Error fetching notices:', error);
        this.notices = 'Failed to load notices.';
      }
    });
  }
}