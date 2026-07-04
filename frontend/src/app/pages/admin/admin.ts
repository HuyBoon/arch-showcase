import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project, Inquiry } from '../../models/project.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
})
export class AdminComponent implements OnInit {
  activeTab: 'projects' | 'inquiries' = 'projects';
  projects: Project[] = [];
  inquiries: Inquiry[] = [];
  
  loadingProjects: boolean = false;
  loadingInquiries: boolean = false;

  // Modal Dialog States
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  editProjectId: string | null = null;
  formError: string | null = null;
  savingProject: boolean = false;

  // Form Binding Object
  currentForm = {
    name: '',
    category: 'Residential',
    location: '',
    year: 2026,
    area: '',
    budget: '',
    architect: '',
    client: '',
    imageUrl: '',
    additionalImages: '',
    description: '',
    features: ''
  };

  private projectService = inject(ProjectService);

  ngOnInit(): void {
    this.loadProjects();
    this.loadInquiries();
  }

  loadProjects(): void {
    this.loadingProjects = true;
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loadingProjects = false;
      },
      error: (err) => {
        console.error('Failed to load projects:', err);
        this.loadingProjects = false;
      }
    });
  }

  loadInquiries(): void {
    this.loadingInquiries = true;
    this.projectService.getInquiries().subscribe({
      next: (data) => {
        this.inquiries = data;
        this.loadingInquiries = false;
      },
      error: (err) => {
        console.error('Failed to load inquiries:', err);
        this.loadingInquiries = false;
      }
    });
  }

  // --- TAB TOGGLE ---

  setTab(tab: 'projects' | 'inquiries'): void {
    this.activeTab = tab;
    if (tab === 'projects') {
      this.loadProjects();
    } else {
      this.loadInquiries();
    }
  }

  // --- PROJECT ACTIONS ---

  openAddModal(): void {
    this.isEditing = false;
    this.editProjectId = null;
    this.formError = null;
    this.currentForm = {
      name: '',
      category: 'Residential',
      location: '',
      year: new Date().getFullYear(),
      area: '',
      budget: '',
      architect: '',
      client: '',
      imageUrl: '',
      additionalImages: '',
      description: '',
      features: ''
    };
    this.isModalOpen = true;
  }

  openEditModal(project: Project): void {
    this.isEditing = true;
    this.editProjectId = project.id;
    this.formError = null;
    this.currentForm = {
      name: project.name,
      category: project.category,
      location: project.location,
      year: project.year,
      area: project.area,
      budget: project.budget,
      architect: project.architect,
      client: project.client,
      imageUrl: project.imageUrl,
      additionalImages: project.additionalImages ? project.additionalImages.join(', ') : '',
      description: project.description,
      features: project.features.join(', ')
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.formError = null;
  }

  onSaveProject(
    name: string,
    category: string,
    location: string,
    yearVal: string,
    area: string,
    budget: string,
    architect: string,
    client: string,
    imageUrl: string,
    addImagesVal: string,
    description: string,
    featuresVal: string,
    event: Event
  ): void {
    event.preventDefault();

    // Validations
    if (
      !name.trim() ||
      !category ||
      !location.trim() ||
      !yearVal ||
      !area.trim() ||
      !budget.trim() ||
      !architect.trim() ||
      !client.trim() ||
      !imageUrl.trim() ||
      !description.trim() ||
      !featuresVal.trim()
    ) {
      this.formError = 'All fields except Gallery Images are required.';
      return;
    }

    const yearNum = parseInt(yearVal, 10);
    if (isNaN(yearNum)) {
      this.formError = 'Year must be a valid number.';
      return;
    }

    // Split features & additional images
    const features = featuresVal
      .split(',')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const additionalImages = addImagesVal
      .split(',')
      .map((img) => img.trim())
      .filter((img) => img.length > 0);

    const projectData = {
      name: name.trim(),
      category,
      location: location.trim(),
      year: yearNum,
      area: area.trim(),
      budget: budget.trim(),
      architect: architect.trim(),
      client: client.trim(),
      imageUrl: imageUrl.trim(),
      additionalImages,
      description: description.trim(),
      features
    };

    this.savingProject = true;
    this.formError = null;

    if (this.isEditing && this.editProjectId) {
      this.projectService.updateProject(this.editProjectId, projectData).subscribe({
        next: () => {
          this.savingProject = false;
          this.closeModal();
          this.loadProjects();
        },
        error: (err) => {
          console.error('Failed to update project:', err);
          this.formError = 'Failed to save project changes. Try again.';
          this.savingProject = false;
        }
      });
    } else {
      this.projectService.createProject(projectData).subscribe({
        next: () => {
          this.savingProject = false;
          this.closeModal();
          this.loadProjects();
        },
        error: (err) => {
          console.error('Failed to create project:', err);
          this.formError = 'Failed to create new project. Try again.';
          this.savingProject = false;
        }
      });
    }
  }

  onDeleteProject(id: string, name: string): void {
    if (confirm(`Are you sure you want to delete project "${name}"? This action cannot be undone.`)) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.loadProjects();
        },
        error: (err) => {
          console.error('Failed to delete project:', err);
          alert('Failed to delete project. Server error.');
        }
      });
    }
  }

  // --- INQUIRY ACTIONS ---

  onDeleteInquiry(id: string): void {
    if (confirm('Are you sure you want to remove this inquiry?')) {
      this.projectService.deleteInquiry(id).subscribe({
        next: () => {
          this.loadInquiries();
        },
        error: (err) => {
          console.error('Failed to delete inquiry:', err);
          alert('Failed to delete inquiry. Server error.');
        }
      });
    }
  }
}
