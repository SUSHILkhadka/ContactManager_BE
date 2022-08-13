class CustomError extends Error {
  constructor(message: string, public statusCode?: number, details?: any) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default CustomError;
