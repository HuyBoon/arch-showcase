import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { InquiriesModule } from './inquiries/inquiries.module';

@Module({
  imports: [ProjectsModule, InquiriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
