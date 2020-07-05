import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from './../erros/request-validation-error';
import { DatabaseConnectionError } from './../erros/database-connection-error';


export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err instanceof RequestValidationError) {
        const formattedErros = err.errors.map(error => {
            return { message: error.msg, field: error.param };
        });

        return res.status(400).send({ erros: formattedErros })
    }

    if (err instanceof DatabaseConnectionError) {
        return res.status(500).send({
            errors: [{
                message: err.reason
            }]
        })
    }
    res.status(400).send({
        message: err.message
    })
};