import { IsString, IsArray } from 'class-validator';

export class CreateFacilityDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public url: string;

  @IsString()
  public client: string;

  @IsArray()
  public licenses: string;
}
