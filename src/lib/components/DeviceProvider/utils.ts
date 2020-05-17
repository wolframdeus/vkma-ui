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
  // Append style element tog get current insets via env variables
  const style = document.createElement('style');
  style.innerHTML = `
  :root {
    --safe-area-inset-top: env(safe-area-inset-top, 0px);
    --safe-area-inset-right: env(safe-area-inset-right, 0px);
    --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
    --safe-area-inset-left: env(safe-area-inset-left, 0px);
  }`;

  // Append to header
  document.head.appendChild(style);

  // Compute style
  const computedStyle = getComputedStyle(document.documentElement);

  // Derive insets
  const insets = {
    top: parseInt(computedStyle.getPropertyValue('--safe-area-inset-top')),
    bottom: parseInt(computedStyle.getPropertyValue('--safe-area-inset-bottom')),
    left: parseInt(computedStyle.getPropertyValue('--safe-area-inset-left')),
    right: parseInt(computedStyle.getPropertyValue('--safe-area-inset-right')),
  };

  // Cleanup
  document.head.removeChild(style);

  return insets;
}
