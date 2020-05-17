import {OS} from '../types';

/**
 * Returns font family depending on operating system
 * @param {OS} os
 * @returns {string}
 */
export function getFontFamily(os: OS): string {
  return os === OS.IOS
    ? '-apple-system, Helvetica Neue, Arial'
    : 'Roboto, Arial';
}
