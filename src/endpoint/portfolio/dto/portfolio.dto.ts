import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PortfolioDto {
  @ApiProperty()
  @IsString()
  owner: string;

  @ApiProperty()
  @IsString()
  avatar: string;
}
