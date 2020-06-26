import { Injectable } from '@nestjs/common';
import { Kanji } from './kanji.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateKanjiDto, UpdateKanjiDto } from './dto/kanji.dto';

@Injectable()
export class KanjiService {
  constructor(
    @InjectModel('Kanji') private readonly kanjiModel: Model<Kanji>,
  ) {}

  async getAllKanji(): Promise<Kanji[]> {
    return this.kanjiModel.find().exec();
  }

  async getKanjiById(_id: string): Promise<Kanji> {
    return this.kanjiModel.findById(_id).exec();
  }

  async createKanji(kanjiDto: CreateKanjiDto): Promise<Kanji> {
    const newKanji = new this.kanjiModel(kanjiDto);
    return newKanji.save();
  }

  async deleteKanji(_id: string): Promise<void> {
    await this.kanjiModel.deleteOne({ _id }).exec();
  }

  async updateKanji(_id: string, kanjiDto: UpdateKanjiDto): Promise<Kanji> {
    return await this.kanjiModel.updateOne({ _id }, kanjiDto).exec();
  }
}
