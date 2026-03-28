import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIf, RouterModule], // Required for *ngIf and routerLink
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  // Must be public so template can access it
  constructor(public authService: Auth) {}
}