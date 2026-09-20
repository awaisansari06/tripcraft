"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Send,
  Clock,
  Shield,
  Sparkles,
  Plane,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated submit
    await new Promise((resolve) => setTimeout(resolve, 1200));

    alert("Thanks! Our team will get back to you shortly ✈️");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-orange-950/20 dark:via-pink-950/20 dark:to-purple-950/20 -z-10" />
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            We’re here to help you plan better trips
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Questions, feedback, or ideas?  
            Our team — powered by AI 🤖 — would love to hear from you.
          </p>
        </div>
      </section>

      {/* ================= CONTACT OPTIONS ================= */}
      <section className="px-6 pb-16">
        <div className="container mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
          {[
            {
              emoji: "🛠",
              title: "Support",
              text: "Need help with a trip or your account?",
              color: "text-orange-600 dark:text-orange-400",
            },
            {
              emoji: "💡",
              title: "Feedback",
              text: "Share ideas to improve TripCraft",
              color: "text-pink-600 dark:text-pink-400",
            },
            {
              emoji: "🤝",
              title: "Partnerships",
              text: "Let’s build something together",
              color: "text-purple-600 dark:text-purple-400",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-zinc-800 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">{item.text}</p>
              <span
                className={`inline-flex items-center gap-1 font-semibold ${item.color}`}
              >
                Get in touch <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-zinc-950">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/40 mb-3">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                AI-Powered Support
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Send us a message
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We usually respond within 24 hours.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-zinc-800 space-y-6"
          >
            <Input
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400"
              required
            />
            <Input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400"
              required
            />
            <Textarea
              placeholder="Tell us how we can help…"
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl py-6 font-semibold hover:scale-[1.02]"
            >
              {isSubmitting ? "Sending…" : "Send Message 🚀"}
            </Button>
          </form>
        </div>
      </section>

      {/* ================= AI HELPER ================= */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm">
            <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Many questions are answered instantly by our AI Trip Assistant —
              but our human team is always here when you need us.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="py-14 bg-gray-50 dark:bg-zinc-950">
        <div className="container mx-auto px-6 max-w-4xl grid md:grid-cols-3 gap-8 text-center">
          <TrustItem
            icon={<Clock />}
            title="Fast response"
            text="Replies within 24 hours"
          />
          <TrustItem
            icon={<Shield />}
            title="Privacy first"
            text="Your data is safe & secure"
          />
          <TrustItem
            icon={<Sparkles />}
            title="Human + AI"
            text="Best of both worlds"
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-orange-950/20 dark:via-pink-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <Plane className="mx-auto mb-4 text-orange-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to plan your next trip?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Let TripCraft build your itinerary in seconds.
          </p>
          <Link href="/create-new-trip">
            <Button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-full px-8 py-6 text-lg hover:scale-105">
              Create New Trip <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ================= TRUST ITEM ================= */
function TrustItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}
