// Analytics configuration and helper functions
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

type EventParams = {
  [key: string]: string | number | boolean;
};

// Initialize GA4
export const initGA = () => {
  if (typeof window !== 'undefined') {
    // Load GA4 script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }
};

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = (action: string, params: EventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
};

// Custom event tracking functions
export const trackVehicleView = (vehicleId: string, vehicleType: string) => {
  event('vehicle_view', {
    vehicle_id: vehicleId,
    vehicle_type: vehicleType,
  });
};

export const trackFormSubmission = (formType: string) => {
  event('form_submission', {
    form_type: formType,
  });
};

export const trackSearch = (searchTerm: string, resultsCount: number) => {
  event('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

export const trackFilterUse = (filterType: string, filterValue: string) => {
  event('filter_use', {
    filter_type: filterType,
    filter_value: filterValue,
  });
};
