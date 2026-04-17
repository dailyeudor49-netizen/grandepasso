"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const FB_PIXEL_ID = "1576025786901423";
const GADS_ID = "AW-17528659507";
const GADS_CONVERSION = "AW-17528659507/kWnjCITH8Z0cELO8qKZB";

export default function TrackingPixels() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    console.log("🎯 TrackingPixels mounted - checking for order data");

    let orderTimestamp: string | null = null;

    let raw: string | null = null;
    try {
      raw = localStorage.getItem("cf_thankyou");
      if (raw) {
        const parsed = JSON.parse(raw);
        orderTimestamp = String(parsed.timestamp || "");
      }
    } catch {}
    if (!raw) {
      console.log("⚠️ No order data found in localStorage");
      return;
    }

    /* Verifica se questo ordine è già stato tracciato (chiave per timestamp) */
    const PURCHASE_KEY = orderTimestamp ? `cf_purchase_tracked_${orderTimestamp}` : "cf_purchase_tracked";
    try {
      if (localStorage.getItem(PURCHASE_KEY) === "1") {
        console.log("⏭️ Order already tracked, skipping");
        return; // Già tracciato, skip
      }
    } catch {}

    console.log("🚀 Processing new order for tracking:", orderTimestamp);

    let d: {
      product?: { title?: string };
      variant?: { id?: string; price?: string };
      upsell?: { price?: string } | null;
      totalPrice?: string;
      timestamp?: number;
      gadsConv?: string;
    };
    try {
      d = JSON.parse(raw);
    } catch {
      return;
    }

    const price = parseFloat(d.variant?.price || "0") || 0;
    const ups = d.upsell ? parseFloat(d.upsell.price || "0") || 0 : 0;
    const value = price + ups;

    /* Facebook Pixel - Purchase */
    const tryFb = () => {
      const w = window as unknown as Record<string, unknown>;
      if (typeof w.fbq === "function") {
        (w.fbq as Function)("track", "Purchase", {
          content_ids: [d.variant?.id ? String(d.variant.id) : ""],
          content_type: "product",
          content_name: d.product?.title || "",
          value,
          currency: "EUR",
        });
        return true;
      }
      return false;
    };

    /* Google Ads - Conversion */
    const tryGtag = () => {
      const w = window as unknown as Record<string, unknown>;
      if (typeof w.gtag === "function") {
        console.log("🔥 Firing Google Ads conversion:", GADS_CONVERSION, "Value:", value);
        (w.gtag as Function)("event", "conversion", {
          send_to: GADS_CONVERSION,
          value,
          currency: "EUR",
          transaction_id:
            "IT-" + String(d.timestamp || Date.now()).slice(-6),
        });
        return true;
      }
      console.log("⚠️ gtag not available yet");
      return false;
    };

    /* Segna come tracciato */
    const markAsFired = () => {
      try {
        localStorage.setItem(PURCHASE_KEY, "1");
        console.log("✅ Conversion marked as tracked");
      } catch {}
    };

    /* Try immediately, then retry a few times while scripts load */
    let fbOk = tryFb();
    let gOk = tryGtag();

    // Mark as fired immediately if at least one tracker succeeded
    if (fbOk || gOk) {
      markAsFired();
    }

    // Retry for scripts that haven't loaded yet
    if (!fbOk || !gOk) {
      let attempts = 0;
      const iv = setInterval(() => {
        attempts++;
        if (!fbOk) {
          fbOk = tryFb();
        }
        if (!gOk) {
          gOk = tryGtag();
        }

        // Mark as fired as soon as any tracker succeeds
        if ((fbOk || gOk) && attempts === 1) {
          markAsFired();
        }

        // Stop retrying when both succeed or max attempts reached
        if ((fbOk && gOk) || attempts >= 10) {
          clearInterval(iv);
          console.log("🏁 Tracking complete - FB:", fbOk, "Google:", gOk);
        }
      }, 500);
    }
  }, []);

  return (
    <>
      {/* Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${FB_PIXEL_ID}');
fbq('track','PageView');`,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* Google Ads tag is loaded globally in layout.tsx */}
    </>
  );
}
