// src/utils/errorHandler.ts
import { Response } from 'express';
import { ErrorResponse } from '../types';

export const handleError = (res: Response, error: unknown, statusCode = 500): void => {
  console.error('Error:', error);
  
  let errorMessage = 'Internal server error';
  
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }
  
  const errorResponse: ErrorResponse = {
    error: errorMessage,
    status: statusCode
  };
  
  res.status(statusCode).json(errorResponse);
};