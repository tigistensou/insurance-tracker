import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  policyNumber: string;
  phone: string;
  insuranceType: string;
  premium: number;
}

const CustomerSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    policyNumber: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    insuranceType: {
      type: String,
      required: true,
    },
    premium: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICustomer>('Customer', CustomerSchema);