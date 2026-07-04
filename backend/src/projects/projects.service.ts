import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Project, Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters?: {
    category?: string;
    search?: string;
    sortBy?: string;
  }): Promise<Project[]> {
    const where: Prisma.ProjectWhereInput = {};

    if (filters?.category && filters.category.toLowerCase() !== 'all') {
      where.category = {
        equals: filters.category,
        mode: 'insensitive',
      };
    }

    if (filters?.search) {
      const search = filters.search;
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { architect: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Default order
    const orderBy: Prisma.ProjectOrderByWithRelationInput = {
      createdAt: 'desc',
    };

    if (filters?.sortBy) {
      if (filters.sortBy === 'views' || filters.sortBy === 'popularity') {
        orderBy.views = 'desc';
        delete orderBy.createdAt;
      } else if (filters.sortBy === 'latest') {
        orderBy.createdAt = 'desc';
      }
    }

    const projects = await this.prisma.project.findMany({
      where,
      orderBy,
    });

    // In-memory sorting for Area since it contains custom string formats like "1,200 m²"
    if (filters?.sortBy === 'area') {
      projects.sort((a, b) => {
        const areaA = parseFloat(a.area.replace(/[^\d.]/g, '')) || 0;
        const areaB = parseFloat(b.area.replace(/[^\d.]/g, '')) || 0;
        return areaB - areaA; // Descending (largest first)
      });
    }

    return projects;
  }

  async findOne(id: string): Promise<Project> {
    // Increment view count and return project details
    const project = await this.prisma.project.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
    try {
      return await this.prisma.project.update({
        where: { id },
        data,
      });
    } catch (e) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<{ success: boolean }> {
    try {
      await this.prisma.project.delete({
        where: { id },
      });
      return { success: true };
    } catch (e) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
}
