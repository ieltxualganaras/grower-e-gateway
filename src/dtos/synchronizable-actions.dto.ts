import { IsString, IsObject } from 'class-validator';

export class CreateSynchronizableActionDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public origin: string;

  @IsObject()
  payload: any;
}
