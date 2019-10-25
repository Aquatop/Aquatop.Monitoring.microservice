import mongoose from 'mongoose';

const AquariumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    ph: {
      type: String,
      required: true,
    },
    waterLevel: {
      type: String,
      required: true,
    },
    temperature: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Aquarium', AquariumSchema);
