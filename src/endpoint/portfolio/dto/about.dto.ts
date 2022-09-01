import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsString } from 'class-validator';

export class AboutDto {
  @ApiProperty()
  @IsString()
  portfolioId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsPositive()
  order: number;
}
