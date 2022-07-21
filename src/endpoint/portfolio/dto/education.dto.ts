import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EducationDto {
  @ApiProperty()
  @IsString()
  portfolioId: string;

  @ApiProperty()
  @IsString()
  school: string;

  @ApiProperty()
  @IsString()
  classroom: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  nivel: string;

  @ApiProperty()
  @IsString()
  duration: string;

  @ApiProperty()
  @IsString()
  period: string;

  @ApiProperty()
  @IsString()
  details: string;
}
