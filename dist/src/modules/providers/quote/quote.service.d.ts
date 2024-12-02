import { EnvService } from '../../../env/env.service';
import { QuoteResponse } from './quote.dto';
export declare class QuoteService {
    private envService;
    private quoteApiUrl;
    constructor(envService: EnvService);
    getQuote(headers: Record<string, string>): Promise<QuoteResponse[]>;
}
