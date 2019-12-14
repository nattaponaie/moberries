import BaseRoute from 'api/_baseRoute';

import product from './product';
import order from './order';
import orderTransaction from './order-transaction';
import customer from './customer';

export default BaseRoute({
  version: '1.0',
  routes: [
    product,
    order,
    orderTransaction,
    customer,
  ],
});
