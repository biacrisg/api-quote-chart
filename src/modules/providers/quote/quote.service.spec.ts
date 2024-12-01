import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from './quote.service';
import { EnvService } from '../../../env/env.service';
import axios from 'axios';
import { BadRequestException } from '@nestjs/common';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('QuoteService', () => {
    let service: QuoteService;
    let envService: EnvService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QuoteService,
                {
                    provide: EnvService,
                    useValue: {
                        get: jest.fn((key: string) => {
                            if (key === 'QUOTE_API_URL') return 'https://fakeapi.com';
                            return null;
                        }),
                    },
                },
            ],
        }).compile();

        service = module.get<QuoteService>(QuoteService);
        envService = module.get<EnvService>(EnvService);
    });

    it('deve ser definido', () => {
        expect(service).toBeDefined();
        expect(envService).toBeDefined();
    });

    it('deve lançar erro se headers estão ausentes', async () => {
        await expect(service.getQuote({})).rejects.toThrow(
            'Os cabeçalhos "currency" e "days" são obrigatórios.',
        );
    });

    it('deve buscar cotações corretamente', async () => {
        const mockResponse = [
            {
                code: 'USD',
                codein: 'BRL',
                name: 'Dólar Americano/Real Brasileiro',
                high: '5.4321',
                low: '5.1234',
                varBid: '0.0010',
                pctChange: '0.50',
                bid: '5.4000',
                ask: '5.4500',
                timestamp: '1672531199',
                create_date: '2024-12-02 10:00:00',
            },
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

        const result = await service.getQuote({ currency: 'USD', days: '3' });
        expect(result).toEqual(mockResponse);
        expect(mockedAxios.get).toHaveBeenCalledWith(
            'https://fakeapi.com/json/daily/USD/3',
        );
    });

    it('deve lançar erro se a API retornar falha', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Erro na API'));
        await expect(
            service.getQuote({ currency: 'USD', days: '3' }),
        ).rejects.toThrow('Erro ao buscar cotações da API.');
    });
});
