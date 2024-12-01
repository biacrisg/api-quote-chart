import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';

describe('QuoteController', () => {
    let controller: QuoteController;
    let service: QuoteService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QuoteController],
            providers: [
                {
                    provide: QuoteService,
                    useValue: {
                        getQuote: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<QuoteController>(QuoteController);
        service = module.get<QuoteService>(QuoteService);
    });

    it('deve ser definido', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });
});
