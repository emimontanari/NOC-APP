import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient()


const severityEnum = {
    low: SeverityLevel.LOW,
    high: SeverityLevel.HIGH,
    medium: SeverityLevel.MEDIUM,
}
export class PostgresLogDatasource implements LogDatasource {
    async saveLogs(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level]
        await prismaClient.log.create({
            data: {
                ...log,
                level
            }
        })
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel]

        const dbLogs = await prismaClient.log.findMany({
            where: {
                level: level
            }
        })

        return dbLogs.map(LogEntity.formObject)
    }

}