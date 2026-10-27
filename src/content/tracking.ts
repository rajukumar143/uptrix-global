// Tracking and marketing tags configuration for Google Tag Manager, Google Ads, and Meta Ads.
export const trackingDefaults = {
  // Google Tag Manager Container ID (e.g. GTM-XXXXXXX)
  googleTagManagerId: "",

  // Google Ads Tag / Conversion ID (e.g. AW-XXXXXXXXXX)
  googleAdsId: "",

  // Meta (Facebook) Pixel ID (e.g. 1234567890123456)
  metaPixelId: "",

  // Google Analytics 4 Measurement ID (e.g. G-XXXXXXXXXX)
  googleAnalyticsId: "",

  // Additional custom scripts to inject into <head> (optional)
  customHeadScript: "",

  // Additional custom scripts or noscript fallback to inject after <body> (optional)
  customBodyScript: "",
};

export type TrackingContent = typeof trackingDefaults;
