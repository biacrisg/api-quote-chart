import { EnvModule } from '../../../env/env.module';
import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';

@Module({
    imports: [EnvModule],
    controllers: [QuoteController],
    providers: [QuoteService],
})
export class QuoteModule { }