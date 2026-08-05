import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import type { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const body = exception instanceof HttpException ? exception.getResponse() : null;

    response.status(status).json({
      statusCode: status,
      path: request.url,
      message: this.resolveMessage(body, exception),
      timestamp: new Date().toISOString(),
    });
  }

  private resolveMessage(body: unknown, exception: unknown) {
    if (typeof body === "string") return body;
    if (body && typeof body === "object" && "message" in body) {
      return (body as { message: unknown }).message;
    }
    if (exception instanceof Error) return exception.message;
    return "Internal server error";
  }
}
