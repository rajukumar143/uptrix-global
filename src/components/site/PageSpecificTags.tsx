"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import type { TrackingContent } from "@/content/tracking";

type Props = {
  tracking: TrackingContent;
};

function getActivePageConfig(pathname: string, tracking: TrackingContent) {
  if (!tracking) return null;
  if (pathname === "/") return tracking.homePage;
  if (pathname.startsWith("/college")) return tracking.collegePage;
  if (pathname.startsWith("/crm/real-estate")) return tracking.realEstatePage;
  if (pathname === "/crm/pricing" || pathname === "/pricing") return tracking.pricingPage;
  if (pathname === "/crm/contact" || pathname === "/contact") return tracking.contactPage;
  if (pathname.startsWith("/blog")) return tracking.blogPage;
  if (pathname.startsWith("/crm")) return tracking.crmPage;
  return null;
}

export default function PageSpecificTags({ tracking }: Props) {
  const pathname = usePathname();
  const pageConfig = getActivePageConfig(pathname, tracking);

  const googleAdsConversionId = pageConfig?.googleAdsConversionId?.trim();
  const metaPixelId = pageConfig?.metaPixelId?.trim();
  const metaEvent = pageConfig?.metaEvent?.trim();
  const customHeadScript = pageConfig?.customHeadScript?.trim();
  const customBodyScript = pageConfig?.customBodyScript?.trim();

  // Trigger page-specific conversion events dynamically on navigation
  useEffect(() => {
    if (!pageConfig) return;

    // 1. Google Ads Conversion Event
    if (googleAdsConversionId && typeof window !== "undefined") {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", "conversion", {
        send_to: googleAdsConversionId,
      });
    }

    // 2. Meta Pixel Page-Specific Event (e.g. Lead, Contact, ViewContent)
    if (metaEvent && typeof window !== "undefined") {
      const w = window as unknown as { fbq?: (...args: unknown[]) => void };
      if (metaEvent.toLowerCase() !== "pageview") {
        w.fbq?.("track", metaEvent);
      }
    }
  }, [pathname, pageConfig, googleAdsConversionId, metaEvent]);

  if (!pageConfig) return null;

  const isSeparateMetaPixel = Boolean(
    metaPixelId && metaPixelId !== tracking.globalTracking?.metaPixelId
  );

  return (
    <>
      {/* Dedicated Meta Pixel for this page if different from global */}
      {isSeparateMetaPixel && metaPixelId && (
        <>
          <Script id={`meta-pixel-page-${metaPixelId}`} strategy="afterInteractive">
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
              fbq('track', '${metaEvent || "PageView"}');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt="meta-pixel-page-noscript"
              src={`https://www.facebook.com/tr?id=${encodeURIComponent(metaPixelId)}&ev=${encodeURIComponent(metaEvent || "PageView")}&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* Page-Specific Custom Head Scripts */}
      {customHeadScript && (
        <script
          id={`page-head-tracking-${pathname.replace(/[^a-zA-Z0-9_-]/g, "")}`}
          dangerouslySetInnerHTML={{ __html: customHeadScript }}
        />
      )}

      {/* Page-Specific Custom Body Scripts */}
      {customBodyScript && (
        <div
          id={`page-body-tracking-${pathname.replace(/[^a-zA-Z0-9_-]/g, "")}`}
          dangerouslySetInnerHTML={{ __html: customBodyScript }}
        />
      )}
    </>
  );
}
