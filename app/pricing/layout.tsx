import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start planning trips for free. Upgrade to Premium for unlimited AI-generated itineraries, smarter planning, and premium travel insights.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
