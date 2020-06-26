import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  dbUsername,
  dbPassword,
  dbHost,
  dbName,
} from './config/variables.config';
import { KanjiModule } from './kanji/kanji.module';

const URL_DATABASE = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
console.log(URL_DATABASE);
@Module({
  imports: [
    MongooseModule.forRoot(URL_DATABASE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    KanjiModule,
  ],
})
export class AppModule {}
