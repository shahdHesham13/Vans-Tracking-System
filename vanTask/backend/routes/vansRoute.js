import express from 'express';
import { Van } from '../models/vansModel.js';


const router = express.Router();

// Add a new van
router.post('/', async (req, res) => {
  try {
    const newVan = new Van(req.body);
    const savedVan = await newVan.save();
    res.status(201).json(savedVan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all vans
router.get('/', async (req, res) => {
  try {
    const vans = await Van.find();
    res.status(200).json(vans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update van location
router.put('/:id/location', async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const updatedVan = await Van.findByIdAndUpdate(
      req.params.id,
      { location: { lat, lng } },
      { new: true }
    );
    res.status(200).json(updatedVan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Trigger geofence alert
router.post('/:id/geofence', async (req, res) => {
  try {
    const updatedVan = await Van.findByIdAndUpdate(
      req.params.id,
      { geofenceAlert: true },
      { new: true }
    );
    res.status(200).json(updatedVan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get maintenance alerts
router.get('/maintenance', async (req, res) => {
  try {
    const vans = await Van.find({ "maintenance.mileage": { $gte: 10000 } });
    res.status(200).json(vans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;