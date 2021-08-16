export interface ActionExecution {
  action: string;
  target: string;
  result: ActionExecutionResult;
}

declare enum ActionExecutionResult {
  SUCCESS,
  FAIL,
  PENDING
}
