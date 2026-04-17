import type { Metadata } from "next";
import ThankYouContent from "@/components/ThankYouContent";
import TrackingPixels from "@/components/TrackingPixels";

export const metadata: Metadata = {
  title: "Grazie per il tuo ordine - Deluxe Arch",
};

export default function DeluxeArchThankYou() {
  return (
    <>
      <TrackingPixels />
      <ThankYouContent landingSlug="deluxe-arch" />
    </>
  );
}
