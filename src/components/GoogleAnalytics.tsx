'use client';

import Script from 'next/script';

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string;
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      
      {/* Google Analytics Configuration */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            // Enhanced measurement
            engagement_time_msec: 1000,
            // Custom dimensions
            custom_map: {
              'custom_dimension1': 'user_type',
              'custom_dimension2': 'content_category',
              'custom_dimension3': 'article_length',
              'custom_dimension4': 'reading_time'
            }
          });
        `}
      </Script>
      
      {/* Enhanced Ecommerce Tracking */}
      <Script id="google-analytics-ecommerce" strategy="afterInteractive">
        {`
          // Track article views
          function trackArticleView(articleTitle, category, author) {
            gtag('event', 'view_item', {
              item_id: articleTitle,
              item_category: category,
              item_brand: author,
              currency: 'USD',
              value: 1
            });
          }
          
          // Track category views
          function trackCategoryView(categoryName) {
            gtag('event', 'view_item_list', {
              item_list_name: categoryName,
              item_list_id: categoryName.toLowerCase()
            });
          }
          
          // Track search queries
          function trackSearch(searchTerm) {
            gtag('event', 'search', {
              search_term: searchTerm
            });
          }
          
          // Track user engagement
          function trackEngagement(action, label) {
            gtag('event', 'user_engagement', {
              action: action,
              label: label
            });
          }
          
          // Track reading time
          function trackReadingTime(articleTitle, readingTime) {
            gtag('event', 'reading_time', {
              article_title: articleTitle,
              reading_time_minutes: readingTime,
              value: readingTime
            });
          }
          
          // Track scroll depth
          function trackScrollDepth(percentage) {
            gtag('event', 'scroll', {
              scroll_depth: percentage,
              value: percentage
            });
          }
          
          // Track time on page
          function trackTimeOnPage(seconds) {
            gtag('event', 'timing_complete', {
              name: 'page_view_time',
              value: seconds * 1000, // Convert to milliseconds
              event_category: 'engagement'
            });
          }
          
          // Track clicks on elements
          function trackClick(elementType, elementText, pageLocation) {
            gtag('event', 'click', {
              element_type: elementType,
              element_text: elementText,
              page_location: pageLocation
            });
          }
          
          // Track form interactions
          function trackFormInteraction(formName, action) {
            gtag('event', 'form_interaction', {
              form_name: formName,
              action: action
            });
          }
          
          // Track errors
          function trackError(errorType, errorMessage, pageLocation) {
            gtag('event', 'exception', {
              description: errorMessage,
              fatal: false,
              custom_parameter: errorType,
              page_location: pageLocation
            });
          }
          
          // Track performance metrics
          function trackPerformance(metricName, value) {
            gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: metricName,
              value: Math.round(value),
              non_interaction: true
            });
          }
          
          // Track social media shares
          function trackSocialShare(platform, articleTitle) {
            gtag('event', 'share', {
              method: platform,
              content_type: 'article',
              item_id: articleTitle
            });
          }
          
          // Track favorites/bookmarks
          function trackFavorite(articleTitle, action) {
            gtag('event', 'favorite', {
              action: action,
              item_id: articleTitle,
              value: action === 'add' ? 1 : 0
            });
          }
          
          // Track newsletter signup
          function trackNewsletterSignup(email) {
            gtag('event', 'sign_up', {
              method: 'newsletter',
              content_type: 'email_subscription'
            });
          }
          
          // Track user registration
          function trackUserRegistration(method) {
            gtag('event', 'sign_up', {
              method: method,
              content_type: 'user_account'
            });
          }
          
          // Track login
          function trackUserLogin(method) {
            gtag('event', 'login', {
              method: method
            });
          }
          
          // Track logout
          function trackUserLogout() {
            gtag('event', 'logout');
          }
          
          // Track video interactions
          function trackVideoInteraction(action, videoTitle) {
            gtag('event', 'video_interaction', {
              action: action,
              video_title: videoTitle
            });
          }
          
          // Track download events
          function trackDownload(fileName, fileType) {
            gtag('event', 'file_download', {
              file_name: fileName,
              file_type: fileType
            });
          }
          
          // Track external links
          function trackExternalLink(url, linkText) {
            gtag('event', 'click', {
              link_url: url,
              link_text: linkText,
              event_category: 'external_link'
            });
          }
          
          // Track internal navigation
          function trackInternalNavigation(fromPage, toPage) {
            gtag('event', 'navigation', {
              from_page: fromPage,
              to_page: toPage,
              event_category: 'internal_navigation'
            });
          }
          
          // Track mobile vs desktop usage
          function trackDeviceType() {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            gtag('event', 'device_type', {
              device_category: isMobile ? 'mobile' : 'desktop',
              user_agent: navigator.userAgent
            });
          }
          
          // Track browser information
          function trackBrowserInfo() {
            const browser = getBrowserInfo();
            gtag('event', 'browser_info', {
              browser_name: browser.name,
              browser_version: browser.version,
              browser_engine: browser.engine
            });
          }
          
          // Helper function to get browser info
          function getBrowserInfo() {
            const userAgent = navigator.userAgent;
            let browser = { name: 'Unknown', version: 'Unknown', engine: 'Unknown' };
            
            if (userAgent.includes('Chrome')) {
              browser.name = 'Chrome';
              browser.engine = 'Blink';
            } else if (userAgent.includes('Firefox')) {
              browser.name = 'Firefox';
              browser.engine = 'Gecko';
            } else if (userAgent.includes('Safari')) {
              browser.name = 'Safari';
              browser.engine = 'WebKit';
            } else if (userAgent.includes('Edge')) {
              browser.name = 'Edge';
              browser.engine = 'Blink';
            }
            
            const versionMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge)\\/([0-9.]+)/);
            if (versionMatch) {
              browser.version = versionMatch[2];
            }
            
            return browser;
          }
          
          // Initialize enhanced tracking
          function initializeEnhancedTracking() {
            // Track device type on page load
            trackDeviceType();
            trackBrowserInfo();
            
            // Track scroll depth
            let maxScroll = 0;
            window.addEventListener('scroll', () => {
              const scrollTop = window.pageYOffset;
              const docHeight = document.documentElement.scrollHeight - window.innerHeight;
              const scrollPercent = Math.round((scrollTop / docHeight) * 100);
              
              if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll % 25 === 0) { // Track every 25%
                  trackScrollDepth(maxScroll);
                }
              }
            });
            
            // Track time on page
            let startTime = Date.now();
            window.addEventListener('beforeunload', () => {
              const timeOnPage = Math.round((Date.now() - startTime) / 1000);
              trackTimeOnPage(timeOnPage);
            });
            
            // Track clicks on important elements
            document.addEventListener('click', (e) => {
              const target = e.target;
              if (target.tagName === 'A') {
                const link = target;
                if (link.hostname !== window.location.hostname) {
                  trackExternalLink(link.href, link.textContent);
                } else {
                  trackInternalNavigation(window.location.pathname, link.pathname);
                }
              } else if (target.tagName === 'BUTTON') {
                trackClick('button', target.textContent, window.location.pathname);
              }
            });
            
            // Track form submissions
            document.addEventListener('submit', (e) => {
              const form = e.target;
              const formName = form.name || form.id || 'unknown_form';
              trackFormInteraction(formName, 'submit');
            });
            
            // Track errors
            window.addEventListener('error', (e) => {
              trackError('javascript_error', e.message, window.location.pathname);
            });
            
            // Track performance metrics
            if ('PerformanceObserver' in window) {
              const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (entry.entryType === 'largest-contentful-paint') {
                    trackPerformance('LCP', entry.startTime);
                  } else if (entry.entryType === 'first-input') {
                    trackPerformance('FID', entry.processingStart - entry.startTime);
                  } else if (entry.entryType === 'layout-shift') {
                    trackPerformance('CLS', entry.value);
                  }
                }
              });
              
              observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
            }
          }
          
          // Make all functions globally available
          window.trackArticleView = trackArticleView;
          window.trackCategoryView = trackCategoryView;
          window.trackSearch = trackSearch;
          window.trackEngagement = trackEngagement;
          window.trackReadingTime = trackReadingTime;
          window.trackScrollDepth = trackScrollDepth;
          window.trackTimeOnPage = trackTimeOnPage;
          window.trackClick = trackClick;
          window.trackFormInteraction = trackFormInteraction;
          window.trackError = trackError;
          window.trackPerformance = trackPerformance;
          window.trackSocialShare = trackSocialShare;
          window.trackFavorite = trackFavorite;
          window.trackNewsletterSignup = trackNewsletterSignup;
          window.trackUserRegistration = trackUserRegistration;
          window.trackUserLogin = trackUserLogin;
          window.trackUserLogout = trackUserLogout;
          window.trackVideoInteraction = trackVideoInteraction;
          window.trackDownload = trackDownload;
          window.trackExternalLink = trackExternalLink;
          window.trackInternalNavigation = trackInternalNavigation;
          window.trackDeviceType = trackDeviceType;
          window.trackBrowserInfo = trackBrowserInfo;
          
          // Initialize enhanced tracking when DOM is ready
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeEnhancedTracking);
          } else {
            initializeEnhancedTracking();
          }
        `}
      </Script>
    </>
  );
}
