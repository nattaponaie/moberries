import express from 'express';
import asyncWrapper from 'middleware/async-wrapper';

import { product } from '../business-logics/';

const router = express.Router();

/**
 * @swagger
 * /order/{addressId}:
 *   get:
 *     summary: "Find person information"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     tags:
 *       - "Address"
 *
 *     parameters:
 *       - name: "addressId"
 *         in: "path"
 *         description: "The response will be in integer"
 *         required: true
 *         type: "integer"
 *
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: "Unauthorized - client to proceed re-login"
 */
router.get(
  '/product',
  asyncWrapper(async (_, res) => {
    const result = await product.findAll();
    res.json(result);
  })
);

export default router;
