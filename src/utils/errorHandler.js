"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (res, error, statusCode = 500) => {
    console.error('Error:', error);
    let errorMessage = 'Internal server error';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    else if (typeof error === 'string') {
        errorMessage = error;
    }
    const errorResponse = {
        error: errorMessage,
        status: statusCode
    };
    res.status(statusCode).json(errorResponse);
};
exports.handleError = handleError;
