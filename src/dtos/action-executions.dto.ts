import { IsString } from 'class-validator';

export class CreateActionExecutionDto {
  @IsString()
  public action: string;

  @IsString()
  public result: string;

  @IsString()
  public target: string;
}
