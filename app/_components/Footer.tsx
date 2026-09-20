import Link from "next/link";
import React from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
    return (
        <footer className="border-t mt-20 bg-gray-50/50 backdrop-blur-xl border-gray-200 dark:bg-black/40 dark:border-white/10">
            <div className="mx-auto max-w-6xl px-6 pt-12 pb-16">
                <div className="grid gap-10 md:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 font-bold text-2xl">
                            <Image src='/logo.svg' alt='logo' width={40} height={40} />
                            TripCraft
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            Your AI-powered travel assistant. Plan, explore and save trips in seconds.
                        </p>
                    </div>

                    {/* Product */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Product</h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <Link href="/create-new-trip" className="hover:text-primary transition-colors">Plan Trip</Link>
                            <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
                        </div>
                    </div>

                    {/* Newsletter - Replaces Company or adds new column */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Stay Updated</h3>
                        <p className="text-xs text-gray-500 max-w-[200px]">Get travel tips and exclusive deals.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                suppressHydrationWarning
                                className="bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-3 py-2 text-xs w-full focus:ring-1 focus:ring-primary outline-none"
                            />
                            <Button size="sm" className="h-auto py-2 px-3 rounded-lg text-xs">
                                →
                            </Button>
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Legal</h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
                            <Link href="https://github.com" target="_blank" className="hover:text-primary transition-colors">
                                GitHub
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="mt-10 flex flex-col gap-6 border-t border-gray-100 dark:border-gray-800 pt-8 text-sm text-gray-500 dark:text-gray-400 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-2">
                        <p>© {new Date().getFullYear()} TripCraft. All rights reserved.</p>
                        <p className="text-xs">Made with ❤️ by TripCraft Team</p>
                    </div>

                    <div className="flex gap-6 items-center">
                        <Link href="https://github.com" target="_blank" className="hover:text-gray-900 dark:hover:text-white transition-all hover:scale-110">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-5 h-5 opacity-70 hover:opacity-100" />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" className="hover:text-blue-600 transition-all hover:scale-110">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="w-5 h-5 opacity-70 hover:opacity-100" />
                        </Link>
                        <Link href="https://twitter.com" target="_blank" className="hover:text-blue-400 transition-all hover:scale-110">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" alt="Twitter" className="w-5 h-5 opacity-70 hover:opacity-100" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
