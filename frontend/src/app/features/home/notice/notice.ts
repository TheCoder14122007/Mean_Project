import { Component } from '@angular/core';
import { Api } from '../../../services/api';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-notice',
  imports: [RouterModule],
  templateUrl: './notice.html',
  styleUrl: './notice.scss',
})
export class Notice {
  notices = 'Loading notices...';

  constructor(private apiService: Api) {}

  ngOnInit() {
    this.getNotices();
  }

  getNotices() {
    this.apiService.getNotices().subscribe({
      next: (response: any) => {
        console.debug('Notice API response:', response);

        const statusOk =
          response &&
          (response.status === 'Y' ||
            response.status === 'y' ||
            response.status === true ||
            response.status === '1' ||
            response.status === 1);

        const data = Array.isArray(response?.data) ? response.data : [];

        if (statusOk && data.length > 0) {
          const noticeArray = data
            .map((item: any) => item?.title || item?.heading || item?.message)
            .filter((text: string) => !!text);

          this.notices = noticeArray.length > 0 ? noticeArray.join(', ') : 'No notices available';
        } else {
          this.notices = 'No notices available';
        }
      },
      error: (error: any) => {
        console.error('Notice API error:', error);
        this.notices = 'Unable to load notices';
      },
    });
  }
}