import mongoose, { Document, Schema } from "mongoose";

export interface ICar {
  model: string;
  registration: string;
  mileAge: number;
  rentalStatus: Boolean;
}
export interface IcarModel extends ICar, Document {}

const CarSchema: Schema = new Schema({
  model: { type: String, required: true },
  registration: { type: String, required: true },
  mileAge: { type: Number, default: 0 },
  rentalStatus: { type: Boolean, default: false },
});

export default mongoose.model<IcarModel>("Car", CarSchema);
