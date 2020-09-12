import { Request, Response } from 'express';

interface AppController {
  store?(
    request: Request,
    response: Response,
  ): Response | Promise<Response> | Promise<void> | Promise<Response | void>;

  destroy?(
    request: Request,
    response: Response,
  ): Response | Promise<Response> | Promise<void> | Promise<Response | void>;

  update?(
    request: Request,
    response: Response,
  ): Response | Promise<Response> | Promise<void> | Promise<Response | void>;

  index?(
    request: Request,
    response: Response,
  ): Response | Promise<Response> | Promise<void> | Promise<Response | void>;

  show?(
    request: Request,
    response: Response,
  ): Response | Promise<Response> | Promise<void> | Promise<Response | void>;
}

export default AppController;
