import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KanjiService } from './kanji.service';
import { KanjiController } from './kanji.controller';
import { KanjiSchema } from './kanji.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Kanji', schema: KanjiSchema }]),
  ],
  providers: [KanjiService],
  controllers: [KanjiController],
})
export class KanjiModule {}
