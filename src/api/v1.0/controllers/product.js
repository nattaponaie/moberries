import express from 'express';
import asyncWrapper from 'middleware/async-wrapper';

import { product } from '../business-logics/';

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: "Find all products information"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     tags:
 *       - "Product"
 *
 *     responses:
 *       200:
 *         description: OK
 */
router.get(
  '/products',
  asyncWrapper(async (_, res) => {
    const result = await product.findAll();
    res.json(result);
  })
);

export default router;
