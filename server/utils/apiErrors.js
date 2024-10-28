class ApiErrors extends Error {
    constructor(statusCode, message = "something went wrong", errors = []) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
      this.success = false;
      this.data = null;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  

  export {ApiErrors}