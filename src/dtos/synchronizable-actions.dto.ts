import { IsString, IsObject } from 'class-validator';

export class CreateSynchronizableActionDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public origin: string;

  @IsString()
  public client: string;

  @IsObject()
  payload: any;
}
