import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ParamDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  endpoint: string;

  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsString()
  type: string;
}
