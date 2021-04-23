import { IsString } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  readonly to: string;
}
