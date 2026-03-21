import { useState, useEffect, useRef, type ReactNode } from "react";

interface LazyWhenInViewProps {
  children: ReactNode;
  /** Root margin for Intersection Observer (e.g. "200px" to load when within 200px of viewport) */
  rootMargin?: string;
  /** Minimum height of placeholder to avoid layout shift before content loads */
  minHeight?: string;
  /** Optional id for the placeholder (e.g. "projects") so nav/sidebar can scroll to it before content loads */
  id?: string;
}

/**
 * Renders children only when the sentinel enters (or is near) the viewport.
 * Used to defer loading of heavy sections (e.g. Projects + Supabase) until the user scrolls,
 * shortening the critical request chain for LCP.
 */
const LazyWhenInView = ({
  children,
  rootMargin = "200px",
  minHeight = "min-h-[400px]",
  id,
}: LazyWhenInViewProps) => {
  const [inView, setInView] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (inView) {
    return <>{children}</>;
  }

  return (
    <div ref={sentinelRef} className={minHeight} id={id} aria-hidden="true">
      {/* Placeholder keeps layout stable; observer uses this ref */}
    </div>
  );
};

export default LazyWhenInView;
