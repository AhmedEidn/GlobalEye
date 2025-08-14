'use client';

import { useEffect } from 'react';

export default function UserInteractionAnalytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let startTime = Date.now();
    let isActive = true;
    let lastActivity = Date.now();

    // Track user activity
    const trackActivity = () => {
      lastActivity = Date.now();
      if (!isActive) {
        isActive = true;
        if ((window as any).gtag) {
          (window as any).gtag('event', 'user_activity', {
            action: 'resume',
            event_category: 'engagement'
          });
        }
      }
    };

    // Track user inactivity
    const checkInactivity = () => {
      const inactiveTime = Date.now() - lastActivity;
      if (inactiveTime > 30000 && isActive) { // 30 seconds
        isActive = false;
        if ((window as any).gtag) {
          (window as any).gtag('event', 'user_activity', {
            action: 'pause',
            event_category: 'engagement'
          });
        }
      }
    };

    // Track mouse movements
    const trackMouseMovement = (e: MouseEvent) => {
      trackActivity();
      if ((window as any).gtag) {
        (window as any).gtag('event', 'mouse_movement', {
          x_position: e.clientX,
          y_position: e.clientY,
          event_category: 'interaction'
        });
      }
    };

    // Track keyboard activity
    const trackKeyboardActivity = () => {
      trackActivity();
      if ((window as any).gtag) {
        (window as any).gtag('event', 'keyboard_activity', {
          event_category: 'interaction'
        });
      }
    };

    // Track touch activity
    const trackTouchActivity = () => {
      trackActivity();
      if ((window as any).gtag) {
        (window as any).gtag('event', 'touch_activity', {
          event_category: 'interaction'
        });
      }
    };

    // Track scroll behavior
    let scrollStartTime = Date.now();
    let scrollDirection = 'none';
    let lastScrollTop = 0;

    const trackScrollBehavior = () => {
      const currentTime = Date.now();
      const scrollTop = window.pageYOffset;
      
      if (scrollTop > lastScrollTop) {
        scrollDirection = 'down';
      } else if (scrollTop < lastScrollTop) {
        scrollDirection = 'up';
      }
      
      if ((window as any).gtag) {
        (window as any).gtag('event', 'scroll_behavior', {
          direction: scrollDirection,
          scroll_position: scrollTop,
          event_category: 'interaction'
        });
      }
      
      lastScrollTop = scrollTop;
      scrollStartTime = currentTime;
    };

    // Track form interactions
    const trackFormInteraction = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'form_interaction', {
            form_element: target.tagName.toLowerCase(),
            form_name: (target as any).name || 'unknown',
            action: 'focus',
            event_category: 'form'
          });
        }
      }
    };

    // Track link clicks
    const trackLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const link = target as HTMLAnchorElement;
        if ((window as any).gtag) {
          (window as any).gtag('event', 'link_click', {
            link_url: link.href,
            link_text: link.textContent,
            link_location: window.location.pathname,
            event_category: 'navigation'
          });
        }
      }
    };

    // Track button clicks
    const trackButtonClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON') {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'button_click', {
            button_text: target.textContent,
            button_location: window.location.pathname,
            event_category: 'interaction'
          });
        }
      }
    };

    // Track image interactions
    const trackImageInteraction = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'image_interaction', {
            image_src: (target as HTMLImageElement).src,
            image_alt: (target as HTMLImageElement).alt,
            event_category: 'media'
          });
        }
      }
    };

    // Track video interactions
    const trackVideoInteraction = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'VIDEO') {
        const video = target as HTMLVideoElement;
        if ((window as any).gtag) {
          (window as any).gtag('event', 'video_interaction', {
            video_src: video.src,
            video_current_time: Math.round(video.currentTime),
            video_duration: Math.round(video.duration),
            event_category: 'media'
          });
        }
      }
    };

    // Track copy/paste actions
    const trackCopyPaste = (e: ClipboardEvent) => {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'clipboard_action', {
          action: e.type,
          event_category: 'interaction'
        });
      }
    };

    // Track right-click context menu
    const trackContextMenu = (e: MouseEvent) => {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'context_menu', {
          x_position: e.clientX,
          y_position: e.clientY,
          event_category: 'interaction'
        });
      }
    };

    // Track window resize
    const trackWindowResize = () => {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'window_resize', {
          width: window.innerWidth,
          height: window.innerHeight,
          event_category: 'system'
        });
      }
    };

    // Track visibility change (tab switching)
    const trackVisibilityChange = () => {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'visibility_change', {
          is_visible: !document.hidden,
          event_category: 'system'
        });
      }
    };

    // Track online/offline status
    const trackConnectionStatus = () => {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'connection_status', {
          is_online: navigator.onLine,
          event_category: 'system'
        });
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', trackMouseMovement);
    document.addEventListener('keydown', trackKeyboardActivity);
    document.addEventListener('touchstart', trackTouchActivity);
    document.addEventListener('scroll', trackScrollBehavior);
    document.addEventListener('focusin', trackFormInteraction);
    document.addEventListener('click', trackLinkClick);
    document.addEventListener('click', trackButtonClick);
    document.addEventListener('click', trackImageInteraction);
    document.addEventListener('click', trackVideoInteraction);
    document.addEventListener('copy', trackCopyPaste);
    document.addEventListener('paste', trackCopyPaste);
    document.addEventListener('contextmenu', trackContextMenu);
    window.addEventListener('resize', trackWindowResize);
    document.addEventListener('visibilitychange', trackVisibilityChange);
    window.addEventListener('online', trackConnectionStatus);
    window.addEventListener('offline', trackConnectionStatus);

    // Check inactivity every 10 seconds
    const inactivityInterval = setInterval(checkInactivity, 10000);

    // Track time on page before unload
    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      if ((window as any).gtag) {
        (window as any).gtag('event', 'page_exit', {
          time_on_page_seconds: timeOnPage,
          event_category: 'engagement'
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', trackMouseMovement);
      document.removeEventListener('keydown', trackKeyboardActivity);
      document.removeEventListener('touchstart', trackTouchActivity);
      document.removeEventListener('scroll', trackScrollBehavior);
      document.removeEventListener('focusin', trackFormInteraction);
      document.removeEventListener('click', trackLinkClick);
      document.removeEventListener('click', trackButtonClick);
      document.removeEventListener('click', trackImageInteraction);
      document.removeEventListener('click', trackVideoInteraction);
      document.removeEventListener('copy', trackCopyPaste);
      document.removeEventListener('paste', trackCopyPaste);
      document.removeEventListener('contextmenu', trackContextMenu);
      window.removeEventListener('resize', trackWindowResize);
      document.removeEventListener('visibilitychange', trackVisibilityChange);
      window.removeEventListener('online', trackConnectionStatus);
      window.removeEventListener('offline', trackConnectionStatus);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(inactivityInterval);
    };
  }, []);

  return null;
}
