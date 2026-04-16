import type { Metadata } from "next";
import ThankYouContent from "@/components/ThankYouContent";
import TrackingPixels from "@/components/TrackingPixels";

export const metadata: Metadata = {
  title: "Grazie per il tuo ordine - LuxeSecret",
};

export default function LuxeSecretThankYou() {
  return (
    <>
      <TrackingPixels />
      <ThankYouContent landingSlug="vitanovasecret" />
    </>
  );
}
