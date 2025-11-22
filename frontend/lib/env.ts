/**
 * Environment configuration for the frontend application
 * Uses NEXT_PUBLIC_ prefix for client-side environment variables
 */

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
