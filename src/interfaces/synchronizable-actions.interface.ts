export interface SynchronizableAction {
  _id: string;
  name: string;
  description: string;
  origin: string;
  payload: any;
}
