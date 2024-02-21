import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const incomingLogs = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Request ${req.method} ${req.originalUrl}`);
  next();
}

const outgoingLogs = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Response ${res.statusCode} ${req.originalUrl}`);
  next();
}
export { incomingLogs, outgoingLogs }