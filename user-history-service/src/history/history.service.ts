import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { Prisma } from '@prisma/client';

type Pagination = {
  skip?: number;
  take?: number;
};

type Props = { page?: number; size?: number; userId?: number };

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHistoryDto) {
    const event = await this.prisma.history.create({ data });
    return event;
  }

  async getAll({ page, size, userId }: Props) {
    const pagination: Pagination = { skip: undefined, take: undefined };
    const filter: Prisma.HistoryFindManyArgs = { where: undefined };

    if (page && size) {
      pagination.skip = (Number(page) - 1) * Number(size);
      pagination.take = Number(size);
    }

    if (userId) {
      filter.where = { userId: Number(userId) };
    }

    const history = await this.prisma.history.findMany({
      ...filter,
      ...pagination,
    });
    return history;
  }
}
