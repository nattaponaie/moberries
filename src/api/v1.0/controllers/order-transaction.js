import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import { get } from 'lodash';
import asyncWrapper from 'middleware/async-wrapper';
import { orderTransaction } from '../business-logics/';
import { apiResponse } from 'utils/json';

const router = express.Router();

/**
 * @swagger
 * /order-transactions/:id:
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

router.patch(
  '/order-transactions/:id',
  validate({
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
    body: Joi.object().keys({
      orderId: Joi.number().required(),
      quantity: Joi.number(),
      size: Joi.string(),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const { id } = req.params || {};
    const orderId = get(req.body, 'orderId');
    const quantity = get(req.body, 'quantity');
    const productSize = get(req.body, 'size');
    const result = await orderTransaction.updateOrderTransaction({ orderId, orderTransactionId: id, quantity, productSize });
    res.json(apiResponse({ type: 'order-transaction', response: result }));
  })
);

export default router;
