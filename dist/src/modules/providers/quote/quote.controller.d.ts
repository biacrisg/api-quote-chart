import { QuoteService } from './quote.service';
export declare class QuoteController {
    private readonly QuoteService;
    constructor(QuoteService: QuoteService);
    getQuote(headers: Record<string, string>): Promise<import("./quote.dto").QuoteResponse[]>;
}
