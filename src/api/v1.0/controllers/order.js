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
 *       - "Order"
 *     parameters:
 *     - name: "status"
 *       in: "query"
 *       description: "Order status values that need to be considered for filter"
 *       required: false
 *       type: "array"
 *       items:
 *         type: "string"
 *         enum:
 *         - "new"
 *         - "preparing"
 *         - "delivering"
 *         - "delivered"
 *         - "removed"
 *     - name: "customerId"
 *       in: "query"
 *       description: "Customer ID values that need to be considered for filter"
 *       required: false
 *       type: "number"
 *     responses:
 *       200:
 *         description: "successful operation"
 *   post:
 *     tags:
 *     - "Order"
 *     summary: "Create new order"
 *     description: "Returns a single order that created"
 *     produces:
 *     - "application/xml"
 *     - "application/json"
 *     parameters:
 *     - name: "body"
 *       in: "body"
 *       description: "Order to create"
 *       required: true
 *       schema:
 *        $ref: "#/definitions/Order"
 *     responses:
 *       200:
 *         description: "successful operation"
 *
 * /orders/{orderId}:
 *   get:
 *     tags:
 *     - "Order"
 *     summary: "Find order by ID"
 *     description: "Returns a single order"
 *     produces:
 *     - "application/xml"
 *     - "application/json"
 *     parameters:
 *     - name: "orderId"
 *       in: "params"
 *       description: "ID of order return"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *     responses:
 *       200:
 *         description: "successful operation"
 *       404:
 *         description: "Order not found"
 *
 * /orders/{orderId}/status:
 *   patch:
 *     tags:
 *     - "Order"
 *     summary: "Update order status by ID"
 *     description: "Returns a updated order"
 *     produces:
 *     - "application/xml"
 *     - "application/json"
 *     parameters:
 *     - name: "orderId"
 *       in: "params"
 *       description: "ID of order return"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *     - name: "body"
 *       in: "body"
 *       description: "Order to create"
 *       required: true
 *       type: "object"
 *       properties:
 *        status:
 *         type: "string"
 *         example: "delivered"
 *     responses:
 *       200:
 *         description: "successful operation"
 *       404:
 *         description: "Order not found"
 *
 * definitions:
 *  Order:
 *   type: "object"
 *   properties:
 *    customerId:
 *     type: "integer"
 *     format: "int64"
 *    product:
 *     type: "array"
 *     xml:
 *      name: "product"
 *      wrapped: true
 *     items:
 *      type: "object"
 *      properties:
 *       name:
 *        type: "string"
 *        example: "margarita"
 *       quantity:
 *        type: "integer"
 *        format: "int64"
 *   xml:
 *    name: "Order"
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
