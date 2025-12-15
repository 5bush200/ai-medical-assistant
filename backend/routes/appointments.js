import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory storage
const appointments = new Map();

// GET - Get all appointments for a user
router.get('/', (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const userAppointments = Array.from(appointments.values())
      .filter(apt => apt.userId === userId)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({
      success: true,
      appointments: userAppointments,
      count: userAppointments.length
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ error: 'Failed to retrieve appointments' });
  }
});

// POST - Create new appointment
router.post('/', (req, res) => {
  try {
    const { userId, doctorName, specialty, date, time, reason, notes } = req.body;

    if (!userId || !doctorName || !specialty || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const appointmentId = uuidv4();
    const appointment = {
      id: appointmentId,
      userId,
      doctorName,
      specialty,
      date,
      time,
      reason,
      notes,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    appointments.set(appointmentId, appointment);

    res.status(201).json({
      success: true,
      appointment
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// GET - Get single appointment
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (!appointments.has(id)) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({
      success: true,
      appointment: appointments.get(id)
    });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({ error: 'Failed to retrieve appointment' });
  }
});

// PUT - Update appointment
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, date, time, notes } = req.body;

    if (!appointments.has(id)) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const appointment = appointments.get(id);
    if (status) appointment.status = status;
    if (date) appointment.date = date;
    if (time) appointment.time = time;
    if (notes) appointment.notes = notes;
    appointment.updatedAt = new Date().toISOString();

    res.json({
      success: true,
      appointment
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// DELETE - Cancel appointment
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (!appointments.has(id)) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    appointments.delete(id);

    res.json({
      success: true,
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

export default router;
