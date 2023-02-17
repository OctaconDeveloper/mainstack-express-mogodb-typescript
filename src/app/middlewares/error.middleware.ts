import { Logger } from '../../utils/logger.util';
import { IResponse } from '../contracts/response.contract';
import { Request, Response, NextFunction } from 'express';
 
export default function ErrorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
    const logger = new Logger();
    const status = 500;
    const message = error.message || 'Something went wrong';
    const trace = error.stack

    const errorObjet: IResponse = {
        code: status,
        message: message,
        error: [ trace ]
    }
    logger.error(message, trace)
//    return res.status(status).send(errorObjet);
};

