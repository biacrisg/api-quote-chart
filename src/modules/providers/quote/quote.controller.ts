import { Controller, Get, Headers, HttpCode } from '@nestjs/common';
import { QuoteService } from './quote.service';

@Controller('/v1')
export class QuoteController {
    constructor(
        private readonly QuoteService: QuoteService,
    ) { }

    @Get('/quote')
    @HttpCode(200)
    async getQuote(@Headers() headers: Record<string, string>) {
        return this.QuoteService.getQuote(headers);
    }

}