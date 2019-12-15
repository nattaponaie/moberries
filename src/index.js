import express from 'express';
import expressWinston from 'express-winston';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { name, version } from '../package.json';
import { NODE_ENV, SERVER_ENDPOINT_PORT, SERVER_OPEN_SWAGGER } from './configs';
import logger, { logInfo, logWarning, logError } from 'utils/logger';
import { supportApis, defaultApi } from './api';
import models from 'models/';

// Setup express
const app = express();
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    if (NODE_ENV !== 'development') {
      const { protocol, hostname } = new URL(origin);
      if (protocol !== 'https:' || !hostname.endsWith('.moberries.com')) {
        logWarning('Malicious request denied', { origin });
        return callback(Error('CORS validation failed'), false);
      }
    }
    callback(null, true);
  },
}));

// Register healthcheck route
app.use('/health-check', (req, res) => {
  res.json({ status: 'OK', service: name, version });
});

app.use(expressWinston.logger({ winstonInstance: logger }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Register API routes
supportApis.forEach((api) => {
  app.use(`/api/v${api.version}`, api.router);
  // Setup swagger UI
  if (SERVER_OPEN_SWAGGER) {
    app.use(`/api/v${api.version}/docs`, swaggerUi.serve, swaggerUi.setup(defaultApi.apiSpec));
    // logInfo(`Initialize Swagger UI based on API v${defaultApi.version} specification`, { endpoint: `${server.endpoint.scheme}://${server.endpoint.host}:${server.endpoint.port}/api/v${api.version}/docs` });
  }
});
app.use('/api', defaultApi.router);

models.sequelize
  .authenticate()
  .then(() => {
    logInfo('Connection has been established successfully.');
  })
  .catch(err => {
    logError('Unable to connect to the database:', err);
  });

// Start express server
let svr = app.listen(SERVER_ENDPOINT_PORT, () => {
  logInfo('🍺  Ready ...', { port: svr.address().port });
});
export default app;
