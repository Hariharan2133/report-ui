// src/app/components/tru-time-chart-page/tru-time-chart-page.component.ts
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ReportService } from '../../services/report.service'; // Corrected path
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // <--- ADD THIS
import { FormsModule } from '@angular/forms'; // <--- ADD THIS for [(ngModel)]

@Component({
  selector: 'app-tru-time-chart-page',
  standalone: true, // <--- Ensure this is true
  imports: [CommonModule, FormsModule], // <--- ADD CommonModule and FormsModule here
  templateUrl: './tru-time-chart-page.component.html',
  styleUrls: ['./tru-time-chart-page.component.css']
})
export class TruTimeChartPageComponent implements OnInit {
  truTimeBarChartUrl: SafeUrl | null = null;
  errorMessage: string | null = null;
  empId: number | null = null;

  constructor(private reportService: ReportService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getTruTimeBarChart();
  }

  getTruTimeBarChart(): void {
    this.errorMessage = null;
    this.truTimeBarChartUrl = null;
    this.reportService.getTruTimeBarChart(this.empId || undefined).subscribe({
      next: (imageBlob: Blob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        this.truTimeBarChartUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        console.log('Successfully fetched Tru-Time bar chart.');
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Error fetching Tru-Time bar chart: ${error.message}`;
        console.error('Error fetching Tru-Time bar chart:', error);
      }
    });
  }
}