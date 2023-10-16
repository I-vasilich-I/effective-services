import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { HistoryService } from './history.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { CreateHistoryDto } from './dto/create-history.dto';

describe('HistoryService', () => {
  let service: HistoryService;
  const prismaMock = mockDeep<PrismaClient>();
  let prisma: DeepMockProxy<PrismaClient>;
  const historyEventInDb = {
    id: 1,
    timestamp: new Date(),
    event: 'create',
    userId: 1,
    request: 'some',
    response: 'sam',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    service = module.get<HistoryService>(HistoryService);
    prisma = module.get(PrismaService);
    mockReset(prismaMock);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createHistoryDto = new CreateHistoryDto();

    it('should create history event and return it', async () => {
      prisma.history.create.mockResolvedValueOnce(historyEventInDb);

      expect(await service.create(createHistoryDto)).toEqual(historyEventInDb);
    });

    it('should throw if history event has not been created', async () => {
      prisma.history.create.mockRejectedValueOnce(new Error());
      try {
        await service.create(createHistoryDto);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('getAll', () => {
    it('should return all history events', async () => {
      const findManySpy = jest.spyOn(prisma.history, 'findMany');
      findManySpy.mockResolvedValueOnce([historyEventInDb, historyEventInDb]);

      const result = await service.getAll({});
      expect(result).toEqual([historyEventInDb, historyEventInDb]);
      expect(findManySpy).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
      });
    });

    it('should return paginated history events', async () => {
      const findManySpy = jest.spyOn(prisma.history, 'findMany');
      findManySpy.mockResolvedValueOnce([historyEventInDb]);

      const result = await service.getAll({ page: 1, size: 1 });
      expect(result).toEqual([historyEventInDb]);
      expect(findManySpy).toHaveBeenCalledWith({
        skip: 0,
        take: 1,
      });
    });

    it('should return filtered by userId history events', async () => {
      const findManySpy = jest.spyOn(prisma.history, 'findMany');
      findManySpy.mockResolvedValueOnce([historyEventInDb]);

      const result = await service.getAll({ userId: 1 });
      expect(result).toEqual([historyEventInDb]);
      expect(findManySpy).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        where: {
          userId: 1,
        },
      });
    });
  });
});
