import { useEffect } from 'react';

let lockCount = 0;
let originalOverflow: string | null = null;

function applyLock() {
  if (typeof document === 'undefined') return;
  if (lockCount === 0) {
    originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount++;
}

function releaseLock() {
  if (typeof document === 'undefined') return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = originalOverflow ?? '';
    originalOverflow = null;
  }
}

export function useBodyScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    applyLock();
    return () => {
      releaseLock();
    };
  }, [active]);
}
