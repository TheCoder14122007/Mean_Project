import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admission.html',
  styleUrl: './admission.scss'
})
export class Admission {
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  @ViewChild('admissionForm') admissionForm!: NgForm;
  
  // Form data model
  formData: any = {
    // Student Details
    studentName: '',
    dob: '',
    gender: '',
    age: null,
    bloodGroup: '',
    religion: '',
    casteCategory: '',
    nationality: '',
    motherTongue: '',
    aadhaar: '',
    
    // Admission Details
    admissionClass: '',
    academicYear: '',
    prevSchool: '',
    reasonLeaving: '',
    
    // Father's Information
    fatherName: '',
    fatherQualification: '',
    fatherOccupation: '',
    fatherOffice: '',
    fatherContact: '',
    fatherEmail: '',
    fatherAadhaar: '',
    
    // Mother's Information
    motherName: '',
    motherQualification: '',
    motherOccupation: '',
    motherOffice: '',
    motherContact: '',
    motherEmail: '',
    motherAadhaar: '',
    
    // Guardian Information
    guardianName: '',
    guardianRelation: '',
    guardianContact: '',
    guardianAddress: '',
    
    // Address Details
    presentAddress: '',
    permanentAddress: '',
    emergencyContact: '',
    altContact: '',
    
    // Declaration
    declarationDate: '',
    declarationCheck: false,
    
    // File
    studentPhoto: null
  };
  
  sameAddress: boolean = false;
  photoPreview: string | null = null;
  showPDFPreview: boolean = false;
  
  // For PDF preview
  pdfData: any = {};
  
  constructor() {}
  
  onSameAddressChange() {
    if (this.sameAddress) {
      this.formData.permanentAddress = this.formData.presentAddress;
    } else {
      this.formData.permanentAddress = '';
    }
  }
  
  onPhotoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formData.studentPhoto = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  async generatePDF() {
    // Check if form is valid
    if (!this.admissionForm.valid || !this.formData.studentPhoto) {
      alert('Please fill all required fields (*) and upload student photo before generating PDF');
      return;
    }
    
    // Prepare data for PDF
    this.pdfData = {
      ...this.formData,
      photoPreview: this.photoPreview
    };
    
    this.showPDFPreview = true;
    
    // Wait for DOM to update
    setTimeout(async () => {
      try {
        const element = this.pdfContent.nativeElement;
        const canvas = await html2canvas(element, {
          useCORS: true,
          logging: false
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        
        pdf.save('admission-form.pdf');
        this.showPDFPreview = false;
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
        this.showPDFPreview = false;
      }
    }, 100);
  }
  
  onSubmit() {
    // Handle form submission if needed
    console.log('Form submitted:', this.formData);
  }
}