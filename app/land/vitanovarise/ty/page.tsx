import type { Metadata } from "next";
import ThankYouContent from "@/components/ThankYouContent";
import TrackingPixels from "@/components/TrackingPixels";

export const metadata: Metadata = {
  title: "Grazie per il tuo ordine - LuxeStep Pro",
};

export default function VitaNovaStepThankYou() {
  return (
    <>
      <TrackingPixels />
      <ThankYouContent landingSlug="vitanovastep" />
    </>
  );
}
