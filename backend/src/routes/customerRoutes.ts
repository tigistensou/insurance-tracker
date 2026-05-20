import { protect } from '../middleware/authMiddleware';
import express from 'express';
import Customer from '../models/Customer';

const router = express.Router();
/**
 * @openapi
 * /customers:
 *   post:
 *     summary: Create a customer
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               policyNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created
 */
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
/**
 * @openapi
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     tags:
 *       - Customers
 *     responses:
 *       200:
 *         description: List of customers
 */
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