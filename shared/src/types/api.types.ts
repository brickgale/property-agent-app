/**
 * Shared API response types
 */

// Standard error response
export interface ApiErrorResponse {
  error: string
}

// Validation error response (from Zod)
export interface ValidationError {
  field: string
  message: string
}

export interface ApiValidationErrorResponse {
  error: string
  details: ValidationError[]
}

// Generic API response wrapper
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
}

// Pagination metadata
export interface PaginationMeta {
  page: number
  perPage: number
  total: number
  totalPages: number
}

// Paginated response wrapper
export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}
