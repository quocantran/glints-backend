import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OtpsService } from './otps.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('otps')
@ApiTags('Otps Controller')
export class OtpsController {
  constructor(private readonly otpsService: OtpsService) {}

  @Post()
  create(@Body() createOtpDto: CreateOtpDto) {
    return this.otpsService.create(createOtpDto);
  }
}
