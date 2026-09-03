import { useState, useEffect, useRef } from 'react';

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? 'hero');
  const offsetsRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const cacheOffsets = () => {
      const map = new Map<string, number>();
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) map.set(id, el.offsetTop);
      }
      offsetsRef.current = map;
    };

    let frame = 0;
    const compute = () => {
      frame = 0;
      const scrollPosition = window.scrollY + 160;
      const offsets = offsetsRef.current;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        if (!id) continue;
        const top = offsets.get(id);
        if (top === undefined) continue;
        if (scrollPosition >= top) {
          setActiveSection((prev) => (prev === id ? prev : id));
          return;
        }
      }
    };

    const onScroll = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(compute);
    };

    const onResize = () => {
      cacheOffsets();
      onScroll();
    };

    cacheOffsets();
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [sectionIds]);

  return activeSection;
}
