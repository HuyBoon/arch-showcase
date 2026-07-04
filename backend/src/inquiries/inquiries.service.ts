import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Inquiry, Prisma } from '@prisma/client';

@Injectable()
export class InquiriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const inquiries = await this.prisma.inquiry.findMany({
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Map to match the frontend expectations of having "projectName" attribute
    return inquiries.map((inq) => ({
      id: inq.id,
      projectId: inq.projectId,
      projectName: inq.project ? inq.project.name : 'Unknown Project',
      name: inq.name,
      email: inq.email,
      phone: inq.phone,
      message: inq.message,
      createdAt: inq.createdAt.toISOString(),
    }));
  }

  async create(data: {
    projectId: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
  }) {
    return this.prisma.inquiry.create({
      data: {
        projectId: data.projectId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      },
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async remove(id: string): Promise<{ success: boolean }> {
    try {
      await this.prisma.inquiry.delete({
        where: { id },
      });
      return { success: true };
    } catch (e) {
      throw new NotFoundException(`Inquiry with ID ${id} not found`);
    }
  }
}
