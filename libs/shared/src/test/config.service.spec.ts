import { FitConfigService } from '../config/config.service';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';

interface IAppConfig {
  nodeEnv: string;
  swagger: {
    enabled: boolean;
  };
}
interface IDatabaseConfig {
  port: number;
  host: string;
}

const mockConfigService = {
  getOrThrow: jest.fn(),
};

describe('FitConfigService', () => {
  let fitConfigService: FitConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FitConfigService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    fitConfigService = module.get(FitConfigService);

    jest.clearAllMocks();
  });

  describe('app config', () => {
    it('return application configuration', () => {
      const appConfig: IAppConfig = {
        nodeEnv: 'development',
        swagger: { enabled: true },
      };

      mockConfigService.getOrThrow.mockReturnValue(appConfig);

      const result = fitConfigService.app;

      expect(result).toEqual(appConfig);
      expect(mockConfigService.getOrThrow).toHaveBeenCalledWith('app', {
        infer: true,
      });
    });

    it('should throw err if there is no application config', () => {
      mockConfigService.getOrThrow.mockImplementation(() => {
        throw new Error('Config not found!');
      });

      expect(() => fitConfigService.app).toThrow('Config not found!');
    });
  });

  describe('database config', () => {
    it('return database configuration', () => {
      const dbConfig: IDatabaseConfig = {
        host: 'localhost',
        port: 5432,
      };

      mockConfigService.getOrThrow.mockReturnValue(dbConfig);

      const result = fitConfigService.database;

      expect(result).toEqual(dbConfig);
      expect(mockConfigService.getOrThrow).toHaveBeenCalledWith('database', {
        infer: true,
      });
    });

    it('should throw err if there is no database config', () => {
      mockConfigService.getOrThrow.mockImplementation(() => {
        throw new Error('Config not found!');
      });

      expect(() => fitConfigService.database).toThrow('Config not found!');
    });
  });
});
