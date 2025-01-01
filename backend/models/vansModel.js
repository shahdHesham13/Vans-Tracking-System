import mongoose from 'mongoose';

const vanSchema = new mongoose.Schema({
  vanId: { type: String, required: true, unique: true },
  location: { 
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  driverBehavior: {
    speed: { type: Number, required: true },
    braking: { type: Number, required: true },
    acceleration: { type: Number, required: true },
  },
  maintenance: {
    mileage: { type: Number, required: true },
    lastServiceDate: { type: Date, required: true },
  },
  geofenceAlert: { type: Boolean, default: false },
}, { timestamps: true });

export const Van = mongoose.model('Van', vanSchema); 