export function isValidString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isLiteralObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && !!value && value.toString?.() === '[object Object]';
}

export function isValidErrorArray(value: unknown): value is Error[] {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((item) => isLiteralObject(item) && 'message' in item);
}