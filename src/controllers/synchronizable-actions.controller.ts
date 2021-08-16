import { NextFunction, Request, Response } from 'express';
import { CreateSynchronizableActionDto } from '@dtos/synchronizable-actions.dto';
import { SynchronizableAction } from '@interfaces/synchronizable-actions.interface';
import synchronizableActionsService from '@services/synchronizable-actions.service';
import actionExecutionsService from '@services/action-executions.service';

class SynchronizableActionController {
  public synchronizableActionsService = new synchronizableActionsService();
  public actionExecutionsService = new actionExecutionsService();

  public getSynchronizableActions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSynchronizableActionsData: SynchronizableAction[] = await this.synchronizableActionsService.findAllSynchronizableActions();

      res.status(200).json({ data: findAllSynchronizableActionsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSynchronizableActionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const synchronizableActionId: string = req.params.id;
      const findOneSynchronizableactionData: SynchronizableAction = await this.synchronizableActionsService.findSynchronizableActionById(
        synchronizableActionId
      );

      res.status(200).json({ data: findOneSynchronizableactionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSynchronizableAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const synchronizableActionData: CreateSynchronizableActionDto = req.body;
      const createSynchronizableAction: SynchronizableAction = await this.synchronizableActionsService.createSynchronizableAction(
        synchronizableActionData
      );

      await this.actionExecutionsService.createExecutionsFromAction(createSynchronizableAction);

      res.status(201).json({ data: createSynchronizableAction, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSynchronizableAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const synchronizableActionId: string = req.params.id;
      const synchronizableActionData: CreateSynchronizableActionDto = req.body;
      const updateSynchronizableActionData: SynchronizableAction = await this.synchronizableActionsService.updateSynchronizableAction(
        synchronizableActionId,
        synchronizableActionData
      );

      res.status(200).json({ data: updateSynchronizableActionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSynchronizableAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const synchronizableActionId: string = req.params.id;
      const deleteSynchronizableActionData: SynchronizableAction = await this.synchronizableActionsService.deleteSynchronizableAction(
        synchronizableActionId
      );

      res.status(200).json({ data: deleteSynchronizableActionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SynchronizableActionController;
