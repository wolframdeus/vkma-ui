import {Insets, OS} from '../../types';

/**
 * Returns current operating system depending on userAgent
 * @param {string} userAgent
 * @returns {OS}
 */
export function getOS(userAgent: string): OS {
  return /Android/i.test(userAgent) ? OS.Android : OS.IOS;
}

/**
 * Returns device insets
 * @returns {Insets}
 */
export function getInsets(): Insets {
  // Compute style
  const computedStyle = getComputedStyle(document.documentElement);

  // Derive insets
  return {
    top: parseInt(computedStyle.getPropertyValue('--safe-area-inset-top')),
    bottom: parseInt(computedStyle.getPropertyValue('--safe-area-inset-bottom')),
    left: parseInt(computedStyle.getPropertyValue('--safe-area-inset-left')),
    right: parseInt(computedStyle.getPropertyValue('--safe-area-inset-right')),
  };
}
