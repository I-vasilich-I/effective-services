import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateHistoryDto) {
    const event = await this.historyService.create(data);
    return event;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query('page') page?: number,
    @Query('size') size?: number,
    @Query('userId') userId?: number,
  ) {
    const history = await this.historyService.getAll({ page, size, userId });
    return history;
  }
}
