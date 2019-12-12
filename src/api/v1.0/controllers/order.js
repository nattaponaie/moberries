import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import asyncWrapper from 'middleware/async-wrapper';

import { order } from '../business-logics/';

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
  '/orders',
  asyncWrapper(async (_, res) => {
    const result = await order.findAll();
    res.json(result);
  })
);

router.post(
  '/orders',
  validate({
    body: Joi.object().keys({
      customerId: Joi.number().required(),
      product: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          quantity: Joi.number().required(),
        })
      ),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const {
      product,
      customerId,
    } = req.body;
    const result = await order.createOrder({ productList: product, customerId });
    res.json(result);
  })
);

export default router;