import type { Metadata } from "next";
import Script from "next/script";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "AureaCloud - Ciabatte Platform con Rialzo Segreto +6cm | Stile Labubu",
  description:
    "Scopri AureaCloud: ciabatte platform stile Crocs/Labubu con rialzo segreto di 6cm. Comodità estrema + altezza extra invisibile. Spedizione gratuita e pagamento alla consegna.",
};

const FB_PIXEL_ID = "1576025786901423";

export default function AureaCloudLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
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
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      {children}
    </div>
  );
}
