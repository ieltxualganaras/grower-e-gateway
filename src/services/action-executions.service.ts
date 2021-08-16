import { Facility } from '@/interfaces/facilities.interface';
import { SynchronizableAction } from '@/interfaces/synchronizable-actions.interface';
import { CreateActionExecutionDto } from '@dtos/action-executions.dto';
import { HttpException } from '@exceptions/HttpException';
import { ActionExecution } from '@interfaces/action-executions.interface';
import actionExecutionModel from '@models/action-exectution.model';
import FacilityService from '@services/facilities.service';
import { isEmpty } from '@utils/util';

class ActionExecutionsService {
  public actionExecutions = actionExecutionModel;
  public facilityService = new FacilityService();

  public async findAllSynchronizableActions(): Promise<ActionExecution[]> {
    const actionExecutions: ActionExecution[] = await this.actionExecutions.find();
    return actionExecutions;
  }

  public async findSynchronizableActionById(actionExecutionId: string): Promise<ActionExecution> {
    if (isEmpty(actionExecutionId)) throw new HttpException(400, 'id required');

    const findActionExecutionData: ActionExecution = await this.actionExecutions.findOne({ _id: actionExecutionId });
    if (!findActionExecutionData) throw new HttpException(409, `Couldn't find action execution with id: ${actionExecutionId}`);

    return findActionExecutionData;
  }

  public async createActionExecution(actionExecutionData: CreateActionExecutionDto): Promise<ActionExecution> {
    if (isEmpty(actionExecutionData)) throw new HttpException(400, 'Invalid request');

    /* const findSynchronizableAction: SynchronizableAction = await this.synchronizableActions.findOne({ name: synchronizableActionData.name });
    if (findSynchronizableAction) throw new HttpException(409, `${synchronizableActionData.name} already exists`); */

    const createActionExecutionsData: ActionExecution = await this.actionExecutions.create({ ...actionExecutionData });

    return createActionExecutionsData;
  }

  public async createExecutionsFromAction(synchronizableActionData: SynchronizableAction): Promise<ActionExecution[]> {
    let facilities: Facility[] = await this.facilityService.findAllFacilities();
    let actionExecutionsToCreate: CreateActionExecutionDto[] = [];
    if (facilities && facilities.length > 1) {
      facilities = facilities.filter(facility => facility.url !== synchronizableActionData.origin);
    }

    actionExecutionsToCreate = facilities.map(facility => {
      return {
        action: synchronizableActionData._id,
        target: facility.url,
        result: 'PENDING'
      };
    });

    return this.actionExecutions.insertMany(actionExecutionsToCreate);
  }

  public async updateActionExecution(actionExecutionId: string, actionExecutionData: CreateActionExecutionDto): Promise<ActionExectution> {
    if (isEmpty(actionExecutionData)) throw new HttpException(400, 'Invalid request');

    const updateActionExecutionData: ActionExecution = await this.actionExecutions.findByIdAndUpdate(actionExecutionId, {
      actionExecutionData
    });
    if (!updateActionExecutionData) throw new HttpException(409, 'Action Execution does not exist');

    return updateActionExecutionData;
  }
}

export default ActionExecutionsService;
