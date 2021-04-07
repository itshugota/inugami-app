import { Request, Response, NextFunction } from 'express';
import { ApiErrorResponse } from '../../payload/response/ApiErrorResponse';
import { HTTPStatus } from '../../enums/HTTPStatusEnum';

const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const message = 'Some unhandled error occured on the backend side.';
  if (Object.keys(err).length === 0) {
    err = {
      message,
      unhandledError: `${err}`
    };
  }

  const apiErrorResponse = new ApiErrorResponse(false, message, err);
  return res.status(HTTPStatus.BAD_REQUEST).json(apiErrorResponse);
};

export { defaultErrorHandler };

export default defaultErrorHandler;
