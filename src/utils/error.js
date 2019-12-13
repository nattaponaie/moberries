import { assign } from 'lodash/fp';

export const CustomError = (obj) => {
  const {
    code, status, message, ...rest
  } = obj;
  const error = new Error();
  return assign(error, {
    message, status: status === 403 ? 400 : status, code, ...rest,
  });
};

export const RequiredError = (field, code) => CustomError({
  code,
  status: 422,
  message: `${field} is required.`,
});

export const InvalidError = (field, code) => CustomError({
  code,
  status: 400,
  message: `Invalid ${field}.`,
});

export const NotFoundError = ({ code, model, message }) => CustomError({
  code,
  status: 404,
  message,
  model,
});

export const DEFAULT_ERROR_MESSAGE = 'Sorry, please try again later.';
