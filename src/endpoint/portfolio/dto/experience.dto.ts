import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ExperienceDto {
  @ApiProperty()
  @IsString()
  portfolioId: string;

  @ApiProperty()
  @IsString()
  company: string;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  duration: string;

  @ApiProperty()
  @IsString()
  from: string;

  @ApiProperty()
  @IsString()
  to: string;

  @ApiProperty()
  @IsString()
  details: string;
}
