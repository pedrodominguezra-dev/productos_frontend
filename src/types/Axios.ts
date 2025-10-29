export interface ApiValidationErrors {
  [field: string]: string[];
}

export interface ApiErrorResponse {
  error?: string;
  message?: string | {
    error: string; message?: string; errors?: ApiValidationErrors 
};
}