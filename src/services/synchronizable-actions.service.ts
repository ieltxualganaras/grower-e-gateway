import { CreateSynchronizableActionDto } from '@dtos/synchronizable-actions.dto';
import { HttpException } from '@exceptions/HttpException';
import { SynchronizableAction } from '@interfaces/synchronizable-actions.interface';
import synchronizableActionModel from '@models/synchronizable-action.model';
import { isEmpty } from '@utils/util';

class SynchronizableActionService {
  public synchronizableActions = synchronizableActionModel;

  public async findAllSynchronizableActions(): Promise<SynchronizableAction[]> {
    const synchronizableActions: SynchronizableAction[] = await this.synchronizableActions.find();
    return synchronizableActions;
  }

  public async findSynchronizableActionById(synchronizableActionId: string): Promise<SynchronizableAction> {
    if (isEmpty(synchronizableActionId)) throw new HttpException(400, 'id required');

    const findSynchronizableAction: SynchronizableAction = await this.synchronizableActions.findOne({ _id: synchronizableActionId });
    if (!findSynchronizableAction) throw new HttpException(409, `Couldn't find synchronizabe actions with id: ${synchronizableActionId}`);

    return findSynchronizableAction;
  }

  public async createSynchronizableAction(synchronizableActionData: CreateSynchronizableActionDto): Promise<SynchronizableAction> {
    if (isEmpty(synchronizableActionData)) throw new HttpException(400, 'Invalid request');

    /* const findSynchronizableAction: SynchronizableAction = await this.synchronizableActions.findOne({ name: synchronizableActionData.name });
    if (findSynchronizableAction) throw new HttpException(409, `${synchronizableActionData.name} already exists`); */

    const createSynchronizableActionData: SynchronizableAction = await this.synchronizableActions.create({ ...synchronizableActionData });

    return createSynchronizableActionData;
  }

  public async updateSynchronizableAction(
    synchronizableActionId: string,
    synchronizableActionData: CreateSynchronizableActionDto
  ): Promise<SynchronizableAction> {
    if (isEmpty(synchronizableActionData)) throw new HttpException(400, 'Invalid request');

    /* if (facilityData.name) {
      const findSynchronizableAction: Facility = await this.facilities.findOne({ name: facilityData.name });
      if (findSynchronizableAction && findSynchronizableAction._id != facilityId) throw new HttpException(409, `${facilityData.name} already exists`);
    } */

    const updateSynchronizableActionData: SynchronizableAction = await this.synchronizableActions.findByIdAndUpdate(synchronizableActionId, {
      synchronizableActionData
    });
    if (!updateSynchronizableActionData) throw new HttpException(409, 'Facility does not exist');

    return updateSynchronizableActionData;
  }

  public async deleteSynchronizableAction(synchronizableActionId: string): Promise<SynchronizableAction> {
    const deleteSynchronizableActionData: SynchronizableAction = await this.synchronizableActions.findByIdAndDelete(synchronizableActionId);
    if (!deleteSynchronizableActionData) throw new HttpException(409, 'Synchronizable action does not exist');

    return deleteSynchronizableActionData;
  }
}

export default SynchronizableActionService;
