import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/apiResponse.js';

export default function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(
      ApiResponse.error(err.message, err.errors)
    );
  }

  return res.status(500).json(
    ApiResponse.error('Internal server error')
  );
}
