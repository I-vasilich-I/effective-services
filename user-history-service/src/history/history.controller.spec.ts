import { Test, TestingModule } from '@nestjs/testing';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';

jest.mock('./history.service.ts');

describe('HistoryController', () => {
  let controller: HistoryController;
  let service: HistoryService;
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
      controllers: [HistoryController],
      providers: [HistoryService],
    }).compile();

    controller = module.get<HistoryController>(HistoryController);
    service = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call create service and return created history event', async () => {
      const createHistoryDto = new CreateHistoryDto();
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(historyEventInDb);
      const result = await controller.create(createHistoryDto);
      expect(createSpy).toHaveBeenCalledWith(createHistoryDto);
      expect(result).toEqual(historyEventInDb);
    });
  });

  describe('getAll', () => {
    it('should call getAll service and return all history events', async () => {
      const getAllSpy = jest
        .spyOn(service, 'getAll')
        .mockResolvedValueOnce([historyEventInDb]);
      const result = await controller.getAll();

      expect(getAllSpy).toHaveBeenCalled();
      expect(result).toEqual([historyEventInDb]);
    });

    it('should call getAll service with pagination options when they are passed', async () => {
      const getAllSpy = jest
        .spyOn(service, 'getAll')
        .mockResolvedValueOnce([historyEventInDb]);
      const result = await controller.getAll(1, 1, 1);

      expect(getAllSpy).toHaveBeenCalledWith({ page: 1, size: 1, userId: 1 });
      expect(result).toEqual([historyEventInDb]);
    });
  });
});
