import type { Metadata } from "next";
import ThankYouContent from "@/components/ThankYouContent";
import TrackingPixels from "@/components/TrackingPixels";

export const metadata: Metadata = {
  title: "Grazie per il tuo ordine - VenoLight",
};

export default function VenoLightThankYou() {
  return (
    <>
      <TrackingPixels />
      <ThankYouContent landingSlug="venolight" />
    </>
  );
}
