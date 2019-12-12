import BaseRoute from 'api/_baseRoute';

import product from './product';
import order from './order';

export default BaseRoute({
  version: '1.0',
  routes: [
    product,
    order,
  ],
});
