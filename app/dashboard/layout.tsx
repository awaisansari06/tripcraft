import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View and manage all your AI-planned trips. Track your travel history, saved places, and itineraries.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
