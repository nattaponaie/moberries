import BaseRoute from 'api/_baseRoute';

import product from './product';

export default BaseRoute({
  version: '1.0',
  routes: [
    product,
  ],
});
