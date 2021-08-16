import { model, Schema, Document } from 'mongoose';
import { SynchronizableAction } from '@/interfaces/synchronizable-actions.interface';

const synchronizableActionSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    origin: {
      type: String,
      required: true
    },
    payload: {
      type: Schema.Types.Mixed
    }
  },
  { timestamps: true }
);

const synchronizableActionModel = model<SynchronizableAction & Document>('SynchronizableAction', synchronizableActionSchema);

export default synchronizableActionModel;
