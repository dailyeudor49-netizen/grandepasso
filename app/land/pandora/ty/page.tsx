import type { Metadata } from "next";
import ThankYouContent from "@/components/ThankYouContent";
import TrackingPixels from "@/components/TrackingPixels";

export const metadata: Metadata = {
  title: "Grazie per il tuo ordine - Pandora",
};

export default function PandoraThankYou() {
  return (
    <>
      <TrackingPixels />
      <ThankYouContent landingSlug="pandora" />
    </>
  );
}
