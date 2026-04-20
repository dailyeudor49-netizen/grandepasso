import type { Metadata } from "next";
import ThankYouContent from "@/components/ThankYouContent";
import TrackingPixels from "@/components/TrackingPixels";

export const metadata: Metadata = {
  title: "Grazie per il tuo ordine - OrthoStep Pro",
};

export default function OrthoStepThankYou() {
  return (
    <>
      <TrackingPixels />
      <ThankYouContent landingSlug="orthostep" />
    </>
  );
}
