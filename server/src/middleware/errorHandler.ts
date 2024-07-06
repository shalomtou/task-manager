import { Request, Response, NextFunction } from 'express';

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
    console.error('Error:', error.message);
    res.status(500).send('Something went wrong');
}

export default errorHandler;
