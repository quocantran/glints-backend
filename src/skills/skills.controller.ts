import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { IUser } from 'src/users/users.interface';
import { User } from 'src/decorator/customize';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createSkillDto: CreateSkillDto, @User() user: IUser) {
    return this.skillsService.create(createSkillDto, user);
  }

  @Get()
  findAll(@Query() qs: string) {
    return this.skillsService.findAll(qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto, @User() user: IUser) {
    return this.skillsService.update(id, updateSkillDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillsService.remove(id);
  }
}
