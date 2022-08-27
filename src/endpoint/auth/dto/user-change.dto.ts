import { IsString, ArrayContains } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserPreferencesDto {
  @IsString()
  // @ArrayContains([
  //   'red',
  //   'volcano',
  //   'orange',
  //   'gold',
  //   'yellow',
  //   'lime',
  //   'green',
  //   'cyan',
  //   'blue',
  //   'geekblue',
  //   'purple',
  //   'magenta',
  //   'gray',
  // ])
  @ApiProperty()
  theme: string;
}
