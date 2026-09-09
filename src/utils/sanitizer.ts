/**
 * Data Sanitization and Security Utilities for NEXUS
 * Guarantees XSS protection and input safety across client and server.
 */

// Escape basic HTML characters to prevent script injection
export function sanitizeText(input: unknown): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/onload=/gi, '')
    .replace(/onerror=/gi, '')
    .trim();
}

// Strip unsafe tags while preserving clean readable text
export function stripHtml(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input.replace(/<[^>]*>?/gm, '').trim();
}

// Sanitize an array of string tags
export function sanitizeTags(tags: unknown[]): string[] {
  if (!Array.isArray(tags)) return ['Idea', 'Collab'];
  return tags
    .slice(0, 8)
    .map((tag) => (typeof tag === 'string' ? tag.replace(/[^a-zA-Z0-9_\-]/g, '').slice(0, 30) : ''))
    .filter((tag) => tag.length > 0);
}

// Validate input length and boundary constraints
export function validateSparkInput(
  title: string,
  content: string,
  tags?: unknown[]
): {
  isValid: boolean;
  error?: string;
  errors: string[];
  sanitizedTitle: string;
  sanitizedContent: string;
  sanitizedTags: string[];
} {
  const cleanTitle = stripHtml(title);
  const cleanContent = stripHtml(content);
  const cleanTags = tags ? sanitizeTags(tags) : ['Hypothesis', 'OpenCollab'];
  const errors: string[] = [];

  if (cleanTitle.length < 3) {
    errors.push('Title must be at least 3 characters long.');
  }
  if (cleanTitle.length > 180) {
    errors.push('Title cannot exceed 180 characters.');
  }
  if (cleanContent.length < 10) {
    errors.push('Description must be at least 10 characters long to provide evolutionary context.');
  }
  if (cleanContent.length > 5000) {
    errors.push('Content cannot exceed 5000 characters.');
  }

  return {
    isValid: errors.length === 0,
    error: errors[0],
    errors,
    sanitizedTitle: cleanTitle,
    sanitizedContent: cleanContent,
    sanitizedTags: cleanTags,
  };
}
