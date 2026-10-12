import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';
import { AppError } from '../../../domain/errors/app.error';

interface RequestValidationSchemas {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
}

export const validateRequest = (schemas: RequestValidationSchemas) => {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }
      if (schemas.query) {
        const parsedQuery = await schemas.query.parseAsync(req.query);
        // Atualiza as propriedades do objeto req.query sem reatribuir a referência
        Object.assign(req.query, parsedQuery);
      }
      if (schemas.params) {
        const parsedParams = await schemas.params.parseAsync(req.params);
        // Atualiza as propriedades do objeto req.params sem reatribuir a referência
        Object.assign(req.params, parsedParams);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issueDetails = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        return next(
          new AppError(
            `Erro de validação: ${issueDetails.map((i) => i.message).join(', ')}`,
            400
          )
        );
      }
      return next(error);
    }
  };
};