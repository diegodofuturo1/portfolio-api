import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class SkillDto {
  @ApiProperty()
  @IsString()
  experienceId: string;

  @ApiProperty()
  @IsString()
  skill: string;

  @ApiProperty()
  @Transform((rating) => parseInt(rating.value))
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
