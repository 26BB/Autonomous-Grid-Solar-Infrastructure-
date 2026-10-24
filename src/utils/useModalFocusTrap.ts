import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Custom hook providing WAI-ARIA compliant focus management for modal dialogs.
 * - Traps keyboard Tab navigation inside the modal container while open.
 * - Auto-focuses the first focusable element upon opening.
 * - Restores focus to the element that was focused prior to opening when closed.
 */
export function useModalFocusTrap<T extends HTMLElement = HTMLDivElement>(isOpen: boolean) {
  const containerRef = useRef<T | null>(null);
  const previousFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save current active element to restore focus on unmount/closing
    previousFocusedElement.current = document.activeElement as HTMLElement | null;

    const container = containerRef.current;
    if (!container) return;

    // Move focus into the modal
    const getFocusableElements = (): HTMLElement[] => {
      if (!container) return [];
      const nodeList = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      const elements: HTMLElement[] = [];
      nodeList.forEach((node) => {
        if (node.offsetWidth > 0 || node.offsetHeight > 0 || node === document.activeElement) {
          elements.push(node);
        }
      });
      return elements;
    };

    const focusables = getFocusableElements();
    if (focusables.length > 0) {
      // Focus first element in modal
      focusables[0].focus();
    } else if (container) {
      // Fallback: focus container if no focusable children
      if (!container.hasAttribute('tabindex')) {
        container.setAttribute('tabindex', '-1');
      }
      container.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const currentFocusables = getFocusableElements();
      if (currentFocusables.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = currentFocusables[0];
      const lastElement = currentFocusables[currentFocusables.length - 1];
      const activeElement = document.activeElement;

      if (e.shiftKey) {
        // Shift + Tab: wrapping from first to last element
        if (activeElement === firstElement || !container.contains(activeElement)) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: wrapping from last to first element
        if (activeElement === lastElement || !container.contains(activeElement)) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Restore previous focus when modal closes
      if (previousFocusedElement.current && typeof previousFocusedElement.current.focus === 'function') {
        previousFocusedElement.current.focus();
      }
    };
  }, [isOpen]);

  return containerRef;
}
