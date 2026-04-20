import type { Metadata } from "next";
import ThankYouContent from "@/components/ThankYouContent";
import TrackingPixels from "@/components/TrackingPixels";

export const metadata: Metadata = {
  title: "Grazie per il tuo ordine - AureaStep Pro",
};

export default function AureaStepThankYou() {
  return (
    <>
      <TrackingPixels />
      <ThankYouContent landingSlug="aureastep" />
    </>
  );
}
