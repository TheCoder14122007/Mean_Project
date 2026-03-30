import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class Signup implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private authService: Auth, 
    private router: Router
  ) {
    console.log('Signup component constructor called'); // Debug log
  }

  ngOnInit(): void {
    console.log('Signup component initialized'); // Debug log
    this.initForm();
    
    // Check if already logged in
    if (this.authService.isLoggedIn()) {
      console.log('User already logged in, redirecting to dashboard');
      this.router.navigate(['/dashboard']);
    }
  }

  initForm(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    console.log('Form initialized'); // Debug log
  }

  onSignup() {
    console.log('Signup form submitted'); // Debug log
    this.errorMessage = '';
    this.successMessage = '';
    
    if (this.signupForm.invalid) {
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
      this.errorMessage = "Please fill all required fields correctly.";
      console.log('Form invalid'); // Debug log
      return;
    }

    if (this.isSubmitting) {
      console.log('Already submitting'); // Debug log
      return;
    }

    this.isSubmitting = true;
    const { name, email, password } = this.signupForm.value;
    console.log('Attempting signup with:', { name, email }); // Debug log (don't log password)

    this.authService.signup(name, email, password)
      .subscribe({
        next: (response: any) => {
          console.log('Signup response:', response); // Debug log
          this.isSubmitting = false;
          
          this.successMessage = "Registration Successful! Redirecting to login...";
          this.signupForm.reset();
          
          setTimeout(() => {
            console.log('Redirecting to login'); // Debug log
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err: any) => {
          console.error('Signup error:', err); // Debug log
          this.isSubmitting = false;
          
          if (err.error?.message) {
            this.errorMessage = err.error.message;
          } else if (err.error?.error) {
            this.errorMessage = err.error.error;
          } else if (err.message) {
            this.errorMessage = err.message;
          } else {
            this.errorMessage = "An error occurred during signup. Please try again.";
          }
        }
      });
  }

  goToLogin() {
    console.log('Navigating to login'); // Debug log
    this.router.navigate(['/login']);
  }
}