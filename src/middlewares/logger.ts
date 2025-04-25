import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    const duration = Date.now() - start;
    const message = body?.message || '';
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms) - ${message}`
    );
    return originalJson(body);
  };

  next();
};
