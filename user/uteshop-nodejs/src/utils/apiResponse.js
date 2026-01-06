export default class ApiResponse {
  constructor({
    success = true,
    message = "",
    data = null,
    errors = null,
  }) {
    this.success = success;
    this.message = message;
    if (data !== null) this.data = data;
    if (errors !== null) this.errors = errors;
  }

  static success(message, data = null) {
    return new ApiResponse({
      success: true,
      message,
      data,
    });
  }

  static error(message, errors = null) {
    return new ApiResponse({
      success: false,
      message,
      errors,
    });
  }
}
