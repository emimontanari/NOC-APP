import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServicesUseCase {
  execute: (url: string) => Promise<boolean>;
}

type SuccessCallBack = (() => void | undefined);
type ErrorCallBack = ((error: string) => void | undefined);

export class CheckService implements CheckServicesUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly SuccessCallBack: SuccessCallBack,
    private readonly ErrorCallBack: ErrorCallBack,
  ) { }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) throw new Error(`Error on check service ${url}`);
      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: 'check-service.ts'
      });
      this.logRepository.saveLogs(log);
      this.SuccessCallBack && this.SuccessCallBack();
      return true;
    } catch (error) {
      const errorMessage = `${url} is no ok. ${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'check-service.ts'

      });
      this.logRepository.saveLogs(log);
      this.ErrorCallBack && this.ErrorCallBack(`${error}`);
      return false;
    }
  }
}
