import { model, Schema, Document } from 'mongoose';
import { Facility } from '@interfaces/facilities.interface';

const facilitySchema: Schema = new Schema(
  {
    description: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    client: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    licenses: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

const facilityModel = model<Facility & Document>('Facility', facilitySchema);

export default facilityModel;
