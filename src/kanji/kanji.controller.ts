import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  ValidationPipe,
  Delete,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { KanjiService } from './kanji.service';
import { Kanji } from './kanji.model';
import { CreateKanjiDto, UpdateKanjiDto } from './dto/kanji.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { LocalAuthGuard } from '../auth/local-auth.guard';
// import { AuthService } from '../auth/auth.service';

@Controller('kanjis')
export class KanjiController {
  constructor(private readonly kanjiService: KanjiService) {}

  @Get('/')
  getAllKanji(): Promise<Kanji[]> {
    return this.kanjiService.getAllKanji();
  }

  @Get('/:id')
  getKanjiById(@Param('id') _id: string): Promise<Kanji> {
    return this.kanjiService.getKanjiById(_id);
  }

  @Post('/')
  createKanji(@Body(ValidationPipe) kanjiDto: CreateKanjiDto): Promise<Kanji> {
    return this.kanjiService.createKanji(kanjiDto);
  }

  @Delete('/:id')
  deleteKanji(@Param('id') _id: string): Promise<void> {
    return this.kanjiService.deleteKanji(_id);
  }
  @Put('/:id')
  updateKanji(
    @Param('id') _id: string,
    @Body(ValidationPipe) kanjiDto: UpdateKanjiDto,
  ): Promise<Kanji> {
    return this.kanjiService.updateKanji(_id, kanjiDto);
  }
}
