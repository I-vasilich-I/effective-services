import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

enum EventType {
  Create = 'create',
  Update = 'update',
}

export class CreateHistoryDto {
  @IsNotEmpty()
  @IsEnum(EventType)
  event: EventType;

  @IsNotEmpty()
  @IsDateString()
  timestamp: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  request: string;

  @IsNotEmpty()
  @IsString()
  response: string;
}
