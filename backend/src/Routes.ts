import { Application } from 'express';

import { authHandler } from './middlewares/handlers/authHandler';
import { AuthController } from './controllers/AuthController';
import { ToDoController } from './controllers/ToDoController';

class Routes {
  public routes(expressApp: Application): void {
    const routeRootPrefix = '/api';

    expressApp.use(`${routeRootPrefix}/auth`, AuthController);

    expressApp.use(authHandler);

    expressApp.use(`${routeRootPrefix}/to-dos`, ToDoController);
  }
}

export { Routes };
