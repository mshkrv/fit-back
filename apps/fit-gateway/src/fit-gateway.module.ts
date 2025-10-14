import { Module } from '@nestjs/common';
import { FitGatewayController } from './fit-gateway.controller';
import * as path from 'node:path';
import { FallbackController } from './fallback.controller';
import { AuthModule } from './auth/auth.module';
import { FitConfigModule } from '@fit/shared';
import { DatabaseModule } from '@fit/database';

@Module({
  imports: [
    FitConfigModule.forRoot({
      envFilePath: [
        '.env.global',
        path.join(process.cwd(), `apps/fit-gateway/.env.development`),
      ],
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [FitGatewayController, FallbackController],
  providers: [],
})
export class FitGatewayModule {}
