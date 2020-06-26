import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateKanjiDto {
  @IsString()
  @IsNotEmpty()
  kanji: string;

  @IsString()
  @IsNotEmpty()
  hiragana: string;
}

export class UpdateKanjiDto {
  @IsString()
  @IsOptional()
  kanji: string;

  @IsString()
  @IsOptional()
  hiragana: string;
}
