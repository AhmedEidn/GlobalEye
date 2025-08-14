/**
 * Date formatting utilities to prevent hydration mismatches
 * Uses consistent ISO format (YYYY-MM-DD) for server and client
 */

export const formatDate = (dateString: string | Date | null | undefined): string => {
  if (!dateString) return 'Unknown Date';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    // Use consistent date format (YYYY-MM-DD) to avoid hydration issues
    // This ensures the same output on both server and client
    return date.toISOString().split('T')[0];
  } catch {
    return 'Invalid Date';
  }
};

export const formatDateReadable = (dateString: string | Date | null | undefined): string => {
  if (!dateString) return 'Unknown Date';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    // Use a more readable format but still consistent
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch {
    return 'Invalid Date';
  }
};

export const formatDateTime = (dateString: string | Date | null | undefined): string => {
  if (!dateString) return 'Unknown Date';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    // Use consistent datetime format
    return date.toISOString();
  } catch {
    return 'Invalid Date';
  }
};
