import Script from "next/script";
import { getPageContent } from "@/lib/content-store";

export default function MarketingTags() {
  // Do not run tracking on admin dashboard
  if (process.env.APP_MODE === "admin") return null;

  let tracking: ReturnType<typeof getPageContent<"tracking">>;
  try {
    tracking = getPageContent("tracking");
  } catch (err) {
    console.warn("Could not load tracking content:", err);
    return null;
  }

  const gtmId = tracking?.googleTagManagerId?.trim();
  const googleAdsId = tracking?.googleAdsId?.trim();
  const metaPixelId = tracking?.metaPixelId?.trim();
  const ga4Id = tracking?.googleAnalyticsId?.trim();
  const customHeadScript = tracking?.customHeadScript?.trim();
  const customBodyScript = tracking?.customBodyScript?.trim();

  const hasAnyTag = Boolean(gtmId || googleAdsId || metaPixelId || ga4Id || customHeadScript || customBodyScript);
  if (!hasAnyTag) return null;

  return (
    <>
      {/* 1. Google Tag Manager (GTM) */}
      {gtmId && (
        <>
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="gtm-noscript"
            />
          </noscript>
        </>
      )}

      {/* 2. Google Ads Tag / Conversion Tracking */}
      {googleAdsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAdsId)}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads-script" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAdsId}');
            `}
          </Script>
        </>
      )}

      {/* 3. Meta (Facebook) Pixel */}
      {metaPixelId && (
        <>
          <Script id="meta-pixel-script" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt="meta-pixel-noscript"
              src={`https://www.facebook.com/tr?id=${encodeURIComponent(metaPixelId)}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* 4. Google Analytics 4 (if configured via admin dashboard) */}
      {ga4Id && !process.env.NEXT_PUBLIC_GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-custom-script" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}');
            `}
          </Script>
        </>
      )}

      {/* 5. Custom Head Scripts (Raw code injection) */}
      {customHeadScript && (
        <script
          id="custom-head-tracking"
          dangerouslySetInnerHTML={{ __html: customHeadScript }}
        />
      )}

      {/* 6. Custom Body Scripts (Raw code injection) */}
      {customBodyScript && (
        <div
          id="custom-body-tracking"
          dangerouslySetInnerHTML={{ __html: customBodyScript }}
        />
      )}
    </>
  );
}
