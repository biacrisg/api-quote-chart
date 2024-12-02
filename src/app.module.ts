import { Module } from '@nestjs/common';
import { AuthModule } from './modules/user/auth/auth.module';
import { QuoteModule } from './modules/providers/quote/quote.module';

import { PrismaService } from '../prisma/prisma.service';
import { EnvModule } from './env/env.module';
import { AppController } from './modules/controller.module';

@Module({
  controllers: [AppController],
  imports: [AuthModule, QuoteModule, EnvModule],
  providers: [PrismaService],
})
export class AppModule { }