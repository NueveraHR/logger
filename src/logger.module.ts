import { DynamicModule, Global, Module } from "@nestjs/common";
import { LoggerService } from ".";
import { LoggerOptions } from "./logger.interface";

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: Partial<LoggerOptions>): DynamicModule {
    const providers = [
      {
        provide: LoggerService,
        useValue: new LoggerService(options),
      },
    ];

    return {
      providers: providers,
      exports: providers,
      module: LoggerModule,
    };
  }
}
