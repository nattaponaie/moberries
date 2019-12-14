import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';

import asyncWrapper from 'middleware/async-wrapper';
import { apiResponse } from 'utils/json';
import { customer } from '../business-logics/';

const router = express.Router();
const resource = 'customer';

/**
 * @swagger
 * /customer:
 *   post:
 *     tags:
 *     - "Customer"
 *     summary: "Create new customer"
 *     description: "Returns a single customer that created"
 *     produces:
 *     - "application/xml"
 *     - "application/json"
 *     parameters:
 *     - name: "body"
 *       in: "body"
 *       description: "Field to update"
 *       required: false
 *       type: "object"
 *       properties:
 *        firstName:
 *         type: "string"
 *         example: "foo"
 *        lastName:
 *         type: "string"
 *         example: "bar"
 *        streetAddress:
 *         type: "string"
 *         example: "99/9 Bangkok Thailand"
 *     responses:
 *       200:
 *         description: "successful operation"
 *
 * definitions:
 *  Customer:
 *   type: "object"
 *   properties:
 *    id:
 *     type: "integer"
 *     example: "1"
 *    personId:
 *     type: "integer"
 *     example: "99"
 *
 *   xml:
 *    name: "Customer"
 */

router.post(
  '/customers',
  validate({
    body: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      streetAddress: Joi.string().required(),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const {
      firstName,
      lastName,
      streetAddress,
    } = req.body;
    const result = await customer.create({ firstName, lastName, streetAddress });
    res.json(apiResponse({ resource, response: result }));
  })
);

export default router;
