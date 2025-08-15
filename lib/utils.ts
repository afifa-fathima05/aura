import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | null | undefined): string {
  // Handle null, undefined, or empty values
  if (!date) {
    return 'Date not available'
  }
  
  let dateObj: Date
  
  // Handle different input types
  if (typeof date === 'string') {
    dateObj = new Date(date)
  } else if (date instanceof Date) {
    dateObj = date
  } else {
    // Handle any other type (like Firestore Timestamp objects)
    try {
      dateObj = new Date(date as any)
    } catch (error) {
      return 'Invalid Date'
    }
  }
  
  // Check if the date is valid
  if (!dateObj || isNaN(dateObj.getTime())) {
    return 'Invalid Date'
  }
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// Animation variants for framer-motion
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}