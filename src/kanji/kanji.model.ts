import * as mongoose from 'mongoose';
import * as mongoosePagination from 'mongoose-paginate-v2';

export const KanjiSchema = new mongoose.Schema(
  {
    kanji: { type: String, required: true, index: { unique: true } },
    hiragana: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

KanjiSchema.plugin(mongoosePagination);

export interface Kanji extends mongoose.Document {
  _id: string;
  kanji: string;
  hiragana: string;
}
