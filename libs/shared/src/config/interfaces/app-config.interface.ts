import { EnvironmentEnum } from '../../enum';

export interface IAppConfig {
  name: string;
  version: string;
  nodeEnv: EnvironmentEnum;
  port: number;
  prefix: string;
  swagger: {
    enabled: boolean;
    title: string;
    description: string;
    version: string;
    path: string;
  };
}
