import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.html',
  styles: `
    .lightbox-open {
      overflow: hidden;
    }
  `
})
export class ProjectDetailComponent implements OnInit {
  project: Project | null = null;
  similarProjects: Project[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Inquiry Form States
  submittingInquiry: boolean = false;
  inquirySuccess: boolean = false;
  inquiryError: string | null = null;

  // Lightbox Image
  selectedImage: string | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectService = inject(ProjectService);

  ngOnInit(): void {
    // Subscribe to route parameter changes so that clicking similar projects updates the page
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProjectDetails(id);
      } else {
        this.error = 'Invalid project ID';
        this.loading = false;
      }
    });
  }

  loadProjectDetails(id: string): void {
    this.loading = true;
    this.error = null;
    this.inquirySuccess = false;
    this.inquiryError = null;

    this.projectService.getProjectById(id).subscribe({
      next: (proj) => {
        this.project = proj;
        this.loading = false;
        this.loadSimilarProjects(proj.category, proj.id);
      },
      error: (err) => {
        console.error('Failed to load project details:', err);
        this.error = 'Project not found or server error.';
        this.loading = false;
      }
    });
  }

  loadSimilarProjects(category: string, currentId: string): void {
    this.projectService.getProjects({ category }).subscribe({
      next: (list) => {
        // Exclude current project and take up to 3 recommendations
        this.similarProjects = list
          .filter(p => p.id !== currentId)
          .slice(0, 3);
      },
      error: (err) => {
        console.error('Failed to load similar projects:', err);
      }
    });
  }

  // --- LIGHTBOX ---

  openLightbox(imageUrl: string): void {
    this.selectedImage = imageUrl;
    document.body.classList.add('lightbox-open');
  }

  closeLightbox(): void {
    this.selectedImage = null;
    document.body.classList.remove('lightbox-open');
  }

  // --- FORM SUBMISSION ---

  onInquirySubmit(
    name: string,
    email: string,
    phone: string,
    message: string,
    event: Event
  ): void {
    event.preventDefault();

    if (!this.project) return;
    
    // Quick validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      this.inquiryError = 'Please fill in all required fields.';
      return;
    }

    this.submittingInquiry = true;
    this.inquiryError = null;
    this.inquirySuccess = false;

    this.projectService.submitInquiry({
      projectId: this.project.id,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim()
    }).subscribe({
      next: () => {
        this.submittingInquiry = false;
        this.inquirySuccess = true;
        
        // Reset form input values via DOM or reset triggers
        const form = event.target as HTMLFormElement;
        form.reset();
      },
      error: (err) => {
        console.error('Inquiry submission failed:', err);
        this.inquiryError = 'An error occurred while submitting your message. Please try again.';
        this.submittingInquiry = false;
      }
    });
  }
}
