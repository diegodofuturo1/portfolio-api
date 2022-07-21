import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
}
