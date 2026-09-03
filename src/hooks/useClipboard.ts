import { useState, useCallback, useRef } from 'react';

function copyToClipboardFallback(text: string): boolean {
  if (typeof document === 'undefined') return false;
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

export function useClipboard(timeout = 2000) {
  const [hasCopied, setHasCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      let ok = false;
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(text);
          ok = true;
        } catch {
          ok = copyToClipboardFallback(text);
        }
      } else {
        ok = copyToClipboardFallback(text);
      }

      if (ok) {
        setHasCopied(true);
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => setHasCopied(false), timeout);
      } else {
        setHasCopied(false);
      }
      return ok;
    },
    [timeout]
  );

  return { hasCopied, copy };
}
