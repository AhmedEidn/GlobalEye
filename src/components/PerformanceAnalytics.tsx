'use client';

import { useEffect } from 'react';

export default function PerformanceAnalytics() {
  useEffect(() => {
    // Track Core Web Vitals
    if (typeof window !== 'undefined') {
      // Track Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              const lcp = entry.startTime;
              if ((window as any).gtag) {
                (window as any).gtag('event', 'web_vitals', {
                  event_category: 'Web Vitals',
                  event_label: 'LCP',
                  value: Math.round(lcp),
                  non_interaction: true
                });
              }
            }
          }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }

      // Track First Input Delay (FID)
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'first-input') {
              const fid = (entry as any).processingStart - entry.startTime;
              if ((window as any).gtag) {
                (window as any).gtag('event', 'web_vitals', {
                  event_category: 'Web Vitals',
                  event_label: 'FID',
                  value: Math.round(fid),
                  non_interaction: true
                });
              }
            }
          }
        });
        observer.observe({ entryTypes: ['first-input'] });
      }

      // Track Cumulative Layout Shift (CLS)
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift') {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
                if ((window as any).gtag) {
                  (window as any).gtag('event', 'web_vitals', {
                    event_category: 'Web Vitals',
                    event_label: 'CLS',
                    value: Math.round(clsValue * 1000) / 1000,
                    non_interaction: true
                  });
                }
              }
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      }

      // Track page load time (with safety checks)
      if ('performance' in window && 'timing' in performance) {
        window.addEventListener('load', () => {
          try {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            if (loadTime > 0 && (window as any).gtag) {
              (window as any).gtag('event', 'timing_complete', {
                name: 'page_load_time',
                value: loadTime,
                event_category: 'performance'
              });
            }
          } catch (error) {
            console.warn('Failed to track page load time:', error);
          }
        });

        // Track DOM content loaded time
        document.addEventListener('DOMContentLoaded', () => {
          try {
            const domReadyTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
            if (domReadyTime > 0 && (window as any).gtag) {
              (window as any).gtag('event', 'timing_complete', {
                name: 'dom_ready_time',
                value: domReadyTime,
                event_category: 'performance'
              });
            }
          } catch (error) {
            console.warn('Failed to track DOM ready time:', error);
          }
        });
      }
    }
  }, []);

  return null;
}
