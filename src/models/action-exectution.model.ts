import { model, Schema, Document, Types } from 'mongoose';
import { ActionExecution } from '@/interfaces/action-executions.interface';

const actionExecutionSchema: Schema = new Schema(
  {
    action: {
      type: Types.ObjectId,
      required: true
    },
    result: {
      type: String,
      required: true,
      enum: ['SUCCESS', 'FAILED', 'PENDING']
    },
    target: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const actionExecutionModel = model<ActionExecution & Document>('ActionExecution', actionExecutionSchema);

export default actionExecutionModel;
