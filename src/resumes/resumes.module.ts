import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { Resume, ResumeSchema } from './schemas/resume.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }]),
    RolesModule,
    UsersModule,
    JobsModule,
  ],
  controllers: [ResumesController],
  providers: [ResumesService],
  exports: [ResumesService, ResumesModule],
})
export class ResumesModule {}
