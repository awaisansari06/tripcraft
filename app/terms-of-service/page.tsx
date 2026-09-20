"use client";

import Link from "next/link";
import { AlertTriangle, CreditCard, Shield, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="py-24 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Terms of Service
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Simple rules so everyone has a great experience using TripCraft.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 space-y-10 pb-24">
        <Card title="What TripCraft does" icon={<Shield />}>
          We provide AI-powered travel planning including itineraries, hotel suggestions, and trip organization.
        </Card>

        <Card title="AI disclaimer" icon={<AlertTriangle />} highlight>
          AI recommendations are guidance only. Prices, availability, and conditions may change at any time.
        </Card>

        <Card title="User responsibilities" icon={<User />}>
          <ul className="list-disc ml-5 space-y-2">
            <li>Provide accurate information</li>
            <li>Use the service lawfully</li>
            <li>Respect platform limits</li>
          </ul>
        </Card>

        <Card title="Subscriptions & payments" icon={<CreditCard />}>
          Paid plans unlock premium features. Subscriptions can be canceled anytime. Refunds follow the billing provider’s policy.
        </Card>

        <Card title="Account termination" icon={<AlertTriangle />}>
          We may suspend accounts that violate these terms or misuse the platform.
        </Card>

        <Card title="Limitation of liability" icon={<Shield />}>
          TripCraft isn’t responsible for travel disruptions or losses caused by reliance on AI-generated plans.
        </Card>

        <Card title="Contact" icon={<User />}>
          Questions about these terms?
          <Link href="/contact-us" className="text-orange-600 font-semibold ml-1">
            Reach out to us
          </Link>
        </Card>
      </section>

      <GradientCTA />
    </main>
  );
}

/* ---------- Components ---------- */

function Card({ title, icon, children, highlight }: any) {
  return (
    <div
      className={`rounded-3xl p-8 border ${
        highlight
          ? "bg-orange-50 border-orange-200"
          : "bg-white border-gray-100"
      } shadow-sm`}
    >
      <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-3">
        {icon}
        {title}
      </h2>
      <div className="text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
}

function GradientCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to plan your next trip?</h2>
      <Link href="/create-new-trip">
        <Button className="bg-white text-gray-900 rounded-full px-8 py-6 font-semibold hover:scale-105">
          Start Planning <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </section>
  );
}
