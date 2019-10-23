import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class HttpExceptions implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

        const cxt = host.switchToHttp();
        const request = cxt.getRequest();
        const response = cxt.getResponse();
        const status = exception.getStatus
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorMessage = {
            code: status,
            method: request.method,
            path: request.url,
            timestamp: new Date().toLocaleTimeString(),
            message: status !== HttpStatus.INTERNAL_SERVER_ERROR
                ? exception.message.error || exception.message || null
                : 'Internal server error',

        };

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            Logger.error(
                `${request.method} ${request.url}`,
                exception.stack,
                'ExceptionFilter',
            );
        } else {
            Logger.error(
                `${request.method} ${request.url}`,
                JSON.stringify(errorMessage),
                'ExceptionFilter',
            );
        }
        response.status(404).json(errorMessage);
    }
}
