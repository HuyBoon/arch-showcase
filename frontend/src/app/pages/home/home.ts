import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ProjectCardComponent } from '../../components/project-card/project-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  categories: string[] = ['All', 'Residential', 'Hospitality', 'Commercial', 'Landscape', 'Interior'];
  
  // Filter States
  selectedCategory: string = 'All';
  searchQuery: string = '';
  sortBy: string = 'latest';

  private projectService = inject(ProjectService);

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getProjects({
      category: this.selectedCategory,
      search: this.searchQuery,
      sortBy: this.sortBy
    }).subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (err) => {
        console.error('Failed to load projects:', err);
      }
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.fetchProjects();
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.fetchProjects();
  }

  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortBy = select.value;
    this.fetchProjects();
  }
}
