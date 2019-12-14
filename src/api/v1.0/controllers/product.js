import express from 'express';
import asyncWrapper from 'middleware/async-wrapper';

import { product } from '../business-logics/';
import { apiResponse } from 'utils/json';

const router = express.Router();
const resource = 'product';

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
    res.json(apiResponse({ resource, response: result }));
  })
);

export default router;
