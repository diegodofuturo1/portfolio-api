import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EndpointDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  path: string;

  @ApiProperty()
  @IsString()
  method: string;

  @ApiProperty()
  @IsString()
  permission: string;
}
