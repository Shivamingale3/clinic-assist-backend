import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        message: 'Welcome to the clinic assist API',
        status: 'success',
        data: {},
      });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
