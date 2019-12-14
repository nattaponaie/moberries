import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import { get } from 'lodash';
import asyncWrapper from 'middleware/async-wrapper';
import { orderTransaction } from 'api/v1.0/business-logics';
import { apiResponse } from 'utils/json';

const router = express.Router();

/**
 * @swagger
 * /order-transactions:
 *   get:
 *     summary: "Find all order transaction information by order ID"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     tags:
 *       - "Order Transaction"
 *     parameters:
 *     - name: "body"
 *       in: "body"
 *       description: "Order id to find"
 *       required: true
 *       type: "object"
 *       properties:
 *        orderId:
 *         type: "integer"
 *         format: "int64"
 *
 *     responses:
 *       200:
 *         description: OK
 *
 * /order-transactions/{orderTransactionId}:
 *   patch:
 *     tags:
 *     - "Order Transaction"
 *     summary: "Update either product size and quantity by order ID"
 *     description: "Returns a updated order"
 *     produces:
 *     - "application/xml"
 *     - "application/json"
 *     parameters:
 *     - name: "orderTransactionId"
 *       in: "params"
 *       description: "ID of order transaction"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *     - name: "body"
 *       in: "body"
 *       description: "Field to update"
 *       required: false
 *       type: "object"
 *       properties:
 *        orderId:
 *         type: "integer"
 *         format: "int64"
 *        quantity:
 *         type: "integer"
 *         format: "int64"
 *        size:
 *         type: "string"
 *         example: "small, medium, large"
 *     responses:
 *       200:
 *         description: "successful operation"
 *       404:
 *         description: "orderTransactionId not found"
 */

const resource = 'order-transaction';

router.get(
  '/order-transactions',
  validate({
    body: Joi.object().keys({
      orderId: Joi.number().required(),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const orderId = get(req.body, 'orderId');
    const result = await orderTransaction.findAllByOrderId({ orderId });
    res.json(apiResponse({ resource, response: result }));
  }),
);

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
    res.json(apiResponse({ resource, response: result }));
  })
);

export default router;
