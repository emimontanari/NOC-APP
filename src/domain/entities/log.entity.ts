export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}
export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}
export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { message, level, createdAt = new Date(), origin } = options;

    this.message = message;
    this.level = level;
    this.origin = origin;
    this.createdAt = new Date();
  }


  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({
      message,
      level,
      createdAt: createdAt,
      origin
    });
    log.createdAt = new Date(createdAt);
    return log;
  };


  static formObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object

    const log = new LogEntity({
      message, level, createdAt, origin
    })

    return log
  }
}
