import { isValidElement } from 'react';

export function isCustomContent(content: unknown): boolean {
  return (
    isValidElement(content) ||
    !['string', 'number', 'boolean', 'undefined'].includes(typeof content)
  );
}
