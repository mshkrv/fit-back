import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { FitConfigModule } from '@fit/shared';
import { TypeormService } from './typeorm.service';

@Module({
  imports: [
    FitConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
      dataSourceFactory: async (options: DataSourceOptions | undefined) => {
        if (!options) {
          throw new Error('DataSourceOptions must be provided');
        }

        return new DataSource(options).initialize();
      },
    }),
  ],
  providers: [TypeormService],
})
export class DatabaseModule {}
