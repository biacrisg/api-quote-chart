import axios from 'axios';
import { Injectable, BadRequestException } from '@nestjs/common';
import { EnvService } from '../../../env/env.service';
import { QuoteResponse } from './quote.dto';

@Injectable()
export class QuoteService {
    private quoteApiUrl: string;

    constructor(private envService: EnvService) {
        this.quoteApiUrl = envService.get('QUOTE_API_URL');
    }

    public async getQuote(headers: Record<string, string>): Promise<QuoteResponse[]> {
        const { currency, days } = headers;

        if (!currency || !days) {
            throw new BadRequestException('Os cabeçalhos "currency" e "days" são obrigatórios.');
        }

        try {
            const url = `${this.quoteApiUrl}/json/daily/${currency}/${days}`;
            const response = await axios.get<QuoteResponse[]>(url);

            return response.data;
        } catch (error) {
            console.error('Erro ao buscar cotações:', error.message);
            throw new BadRequestException('Erro ao buscar cotações da API.');
        }
    }
}
