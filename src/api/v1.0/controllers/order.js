import express from 'express';
import validate from 'express-validation';
import { get } from 'lodash';
import Joi from 'joi';
import asyncWrapper from 'middleware/async-wrapper';

import { order } from '../business-logics/';
import { apiResponse } from 'utils/json';

const router = express.Router();

/**
 * @swagger
 * /orders:
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

const resource = 'order';

router.get(
  '/orders',
  validate({
    query: Joi.object().keys({
      customer: Joi.string(),
      status: Joi.string(),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const customer = get(req.query, 'customer');
    const status = get(req.query, 'status');
    const result = await order.findAll({ customerId: customer, statusName: status });
    res.json(apiResponse({ resource, response: result }));
  })
);

router.get(
  '/orders/:id',
  validate({
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const { id } = req.params || {};
    const result = await order.findOrderById({ id });
    res.json(apiResponse({ resource, response: result }));
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
    res.json(apiResponse({ resource, response: result }));
  })
);

router.patch(
  '/orders/:id/status',
  validate({
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
    body: Joi.object().keys({
      status: Joi.string().required(),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const { id } = req.params || {};
    const {
      status,
    } = req.body;
    const result = await order.updateOrderStatusById({ orderId: id, status });
    res.json(apiResponse({ resource, response: result }));
  })
);

export default router;
