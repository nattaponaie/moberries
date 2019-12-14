import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import { get } from 'lodash';

import asyncWrapper from 'middleware/async-wrapper';
import { product } from 'api/v1.0/business-logics';
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

router.post(
  '/products',
  validate({
    body: Joi.object().keys({
      product: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          size: Joi.string().required(),
          price: Joi.number().required(),
          description: Joi.string().required(),
        })
      ),
    }),
  }),
  asyncWrapper(async (req, res) => {
    const productList = get(req, ['body', 'product']);
    const result = await product.create({ productList });
    res.json(apiResponse({ resource, response: result }));
  })
);

export default router;
