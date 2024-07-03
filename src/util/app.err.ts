import { HttpStatus, HttpException } from '@nestjs/common';

export class AppError extends HttpException {
  constructor(message: string, statusCode = HttpStatus.BAD_REQUEST) {
    super(message, statusCode);
  }
}