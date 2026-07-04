import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Get()
  async findAll() {
    return this.inquiriesService.findAll();
  }

  @Post()
  async create(
    @Body()
    body: {
      projectId: string;
      name: string;
      email: string;
      phone?: string;
      message: string;
    },
  ) {
    return this.inquiriesService.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.inquiriesService.remove(id);
  }
}
