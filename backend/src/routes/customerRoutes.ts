import { protect } from '../middleware/authMiddleware';
import express from 'express';
import Customer from '../models/Customer';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    console.log(req.body);

    const customer = await Customer.create(req.body);

    res.status(201).json(customer);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Failed to save customer',
      error,
    });
  }
});

router.get('/', protect, async (_req, res) => {
  try {
    const customers = await Customer.find();

    res.json(customers);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Failed to fetch customers',
    });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Customer.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: 'Customer deleted',
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Delete failed',
    });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: 'Update failed',
    });
  }
});

export default router;