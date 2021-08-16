import { Router } from 'express';
import SynchronizableActionController from '@controllers/synchronizable-actions.controller';
import { CreateSynchronizableActionDto } from '@dtos/synchronizable-actions.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class SynchronizableActionsRoute implements Routes {
  public path = '/sync';
  public router = Router();
  public synchronizableActionController = new SynchronizableActionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateSynchronizableActionDto, 'body'),
      this.synchronizableActionController.createSynchronizableAction
    );
  }
}

export default SynchronizableActionsRoute;
