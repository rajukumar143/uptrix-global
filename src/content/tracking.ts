// Tracking and marketing tags configuration for Google Tag Manager, Google Ads, and Meta Ads.
// Supports both Global tags (all pages) and Individual Page tags.

export const trackingDefaults = {
  // 1. Global Tracking (Applies across all pages of the site)
  globalTracking: {
    googleTagManagerId: "", // e.g. GTM-XXXXXXX
    googleAdsId: "",        // e.g. AW-XXXXXXXXXX
    metaPixelId: "",        // e.g. 1234567890123456
    googleAnalyticsId: "",  // e.g. G-XXXXXXXXXX (optional override)
    customHeadScript: "",   // Global scripts for <head>
    customBodyScript: "",   // Global scripts for <body>
  },

  // 2. Individual Page Tracking: Home Page (/)
  homePage: {
    googleAdsConversionId: "", // e.g. AW-XXXXXXXXXX/conversion_label
    metaPixelId: "",           // Dedicated Meta Pixel ID (optional)
    metaEvent: "PageView",     // e.g. ViewContent or PageView
    customHeadScript: "",
    customBodyScript: "",
  },

  // 3. Individual Page Tracking: College ERP & CRM (/college)
  collegePage: {
    googleAdsConversionId: "",
    metaPixelId: "",
    metaEvent: "ViewContent",  // e.g. ViewContent or Lead
    customHeadScript: "",
    customBodyScript: "",
  },

  // 4. Individual Page Tracking: Real Estate CRM (/crm/real-estate)
  realEstatePage: {
    googleAdsConversionId: "",
    metaPixelId: "",
    metaEvent: "ViewContent",
    customHeadScript: "",
    customBodyScript: "",
  },

  // 5. Individual Page Tracking: Pulse Sales CRM (/crm)
  crmPage: {
    googleAdsConversionId: "",
    metaPixelId: "",
    metaEvent: "ViewContent",
    customHeadScript: "",
    customBodyScript: "",
  },

  // 6. Individual Page Tracking: Pricing Page (/crm/pricing)
  pricingPage: {
    googleAdsConversionId: "",
    metaPixelId: "",
    metaEvent: "InitiateCheckout",
    customHeadScript: "",
    customBodyScript: "",
  },

  // 7. Individual Page Tracking: Contact & Demo (/crm/contact)
  contactPage: {
    googleAdsConversionId: "", // e.g. AW-XXXXXXXXXX/contact_conversion_label
    metaPixelId: "",
    metaEvent: "Contact",      // e.g. Contact or Lead
    customHeadScript: "",
    customBodyScript: "",
  },

  // 8. Individual Page Tracking: Blog (/blog)
  blogPage: {
    googleAdsConversionId: "",
    metaPixelId: "",
    metaEvent: "ViewContent",
    customHeadScript: "",
    customBodyScript: "",
  },
};

export type TrackingContent = typeof trackingDefaults;
