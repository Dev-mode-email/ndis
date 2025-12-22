import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get public asset URL with correct base path for GitHub Pages
 * @param path - Path to asset (e.g., '/logo.png' or 'logo.png')
 * @returns Full path with base URL
 */
export function getPublicUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${base}${cleanPath}`
}
