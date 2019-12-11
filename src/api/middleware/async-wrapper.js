import { logError } from 'utils/logger';
import { ERRORS } from 'database/constant/errors';
import { get } from 'lodash';

export default (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    logError(err);
    const status = get(err, ['status'], 500);
    const name = get(err, ['name'], 'UnhandledError');
    const messageCode = get(err, ['messageCode'], ERRORS.UNHANDLED_ERRORS);
    const message = `${err}`;
    res.status(status);
    res.json({ status, name, messageCode, message });
  });
};
