import { Request, Response } from 'express';

interface AppController {
  store?(
    request: Request,
    response: Response,
  ): Response | Promise<Response> | Promise<void>;

  destroy?(
    request: Request,
    response: Response,
  ): Response | Promise<Response> | Promise<void>;

  update?(
    request: Request,
    response: Response,
  ): Response | Promise<Response> | Promise<void>;

  index?(
    request: Request,
    response: Response,
  ): Response | Promise<Response> | Promise<void>;

  show?(
    request: Request,
    response: Response,
  ): Response | Promise<Response> | Promise<void>;
}

export default AppController;
