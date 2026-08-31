"use client"

import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/gradient-button';
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Home, DollarSign, Mail, LayoutDashboard, Plane, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const menuOptions = [
  {
    name: 'Home',
    path: '/',
    icon: Home
  },
  {
    name: 'Pricing',
    path: '/pricing',
    icon: DollarSign
  },
  {
    name: 'Contact us',
    path: '/contact-us',
    icon: Mail
  }
]


function Header() {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render theme toggle after mount
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open - PRESERVE scroll position
  useEffect(() => {
    if (mobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      // Cleanup function to restore scroll position when menu closes
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';

        // Disable smooth scrolling
        document.documentElement.style.scrollBehavior = 'auto';

        // Restore scroll position after layout update
        setTimeout(() => {
          window.scrollTo(0, scrollY);

          // Re-enable smooth scrolling after a small delay
          setTimeout(() => {
            document.documentElement.style.scrollBehavior = '';
          }, 50);
        }, 0);
      };
    }
  }, [mobileMenuOpen]);

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
      ? 'bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-white/10'
      : 'bg-transparent border-transparent'
      }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Left Logo */}
        <Link href="/" className='flex gap-2 items-center'>
          <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
          <h1 className='font-bold text-xl'>SmartJourney</h1>
        </Link>

        {/* DESKTOP: Center Links (≥md) */}
        <nav className="hidden md:flex items-center gap-10 text-base font-medium text-gray-700 dark:text-gray-200">
          {menuOptions.map((menu, index) => (
            <Link href={menu.path} key={index} className="relative group hover:text-primary transition-colors">
              {menu.name}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2.5px] bg-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right Buttons */}
        <div className='flex gap-2 items-center'>
          {/* DESKTOP: Action Buttons (≥md) */}
          <div className="hidden md:flex gap-2 items-center">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}
            <SignedIn>
              <GradientButton variant="outline" onClick={() => router.push('/dashboard')}>Dashboard</GradientButton>
              {pathname !== '/create-new-trip' &&
                <GradientButton onClick={() => router.push('/create-new-trip')}>Create New Trip</GradientButton>
              }
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignUpButton mode="modal">
                <GradientButton>Sign Up</GradientButton>
              </SignUpButton>
              <SignInButton mode="modal">
                <GradientButton variant="outline">Sign In</GradientButton>
              </SignInButton>
            </SignedOut>
          </div>

          {/* MOBILE: User Avatar (always visible when signed in) */}
          <SignedIn>
            <div className="md:hidden">
              <UserButton />
            </div>
          </SignedIn>

          {/* MOBILE: Hamburger Menu Button (<md) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE: Slide-in Drawer (<md) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop - Reduced opacity for context visibility */}
          <div
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={closeMobileMenu}
            style={{
              animation: 'fadeIn 0.25s ease-out'
            }}
          />

          {/* 🔧 FIX 2: Drawer - GPU-accelerated transform (smooth regardless of scroll) */}
          <div
            className="md:hidden fixed top-0 right-0 bottom-0 w-[60%] min-w-[280px] max-w-[400px] bg-white/98 dark:bg-black/98 backdrop-blur-2xl shadow-2xl z-[70] flex flex-col rounded-l-[32px] border-l border-gray-200/50 dark:border-gray-800/50"
            style={{
              animation: 'slideInRight 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '-12px 0 40px rgba(0, 0, 0, 0.15), -4px 0 16px rgba(0, 0, 0, 0.1)',
              // 🔧 FIX 2: Force GPU acceleration for smoother animation
              willChange: 'transform',
              transform: 'translateZ(0)'
            }}
          >
            {/* Header Section - User Info */}
            <div className="px-6 pt-8 pb-5 flex-shrink-0">
              <SignedIn>
                <div className="flex flex-col items-center text-center space-y-2.5">
                  {/* Avatar - Gradient Circle */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-orange-500/30">
                    {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress[0].toUpperCase()}
                  </div>
                  {/* User Details */}
                  <div className="space-y-0.5">
                    <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {user?.firstName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 break-all px-4">
                      {user?.emailAddresses[0]?.emailAddress}
                    </p>
                  </div>
                </div>
              </SignedIn>

              <SignedOut>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                    <Menu className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Welcome to SmartJourney
                  </p>
                </div>
              </SignedOut>
            </div>

            {/* Visual Divider - Intentional Structure */}
            <div className="border-t border-gray-200/60 dark:border-gray-800/60 flex-shrink-0" />

            {/* Navigation Links - Tighter spacing */}
            <nav className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-0.5">
                {menuOptions.map((menu, index) => {
                  const Icon = menu.icon;
                  const isActive = pathname === menu.path;
                  return (
                    <Link
                      key={index}
                      href={menu.path}
                      onClick={closeMobileMenu}
                      className={`relative flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-200 group ${isActive
                        ? 'bg-gradient-to-r from-orange-500/12 via-pink-500/12 to-purple-600/12 text-primary font-semibold shadow-sm shadow-orange-500/10'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/50 active:scale-[0.98]'
                        }`}
                    >
                      {/* Left Accent Bar - Stronger Active State */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-orange-500 via-pink-500 to-purple-600 rounded-r-full shadow-sm shadow-orange-500/50" />
                      )}

                      <Icon className={`w-5 h-5 transition-all ${isActive ? 'opacity-100 scale-110' : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'
                        }`} />
                      <span className={`text-[15px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                        {menu.name}
                      </span>

                      {/* Subtle glow for active */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/5 via-pink-500/5 to-purple-600/5 blur-sm" />
                      )}
                    </Link>
                  );
                })}

                {/* Dashboard Link (Signed In) */}
                <SignedIn>
                  <Link
                    href="/dashboard"
                    onClick={closeMobileMenu}
                    className={`relative flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-200 group ${pathname === '/dashboard'
                      ? 'bg-gradient-to-r from-orange-500/12 via-pink-500/12 to-purple-600/12 text-primary font-semibold shadow-sm shadow-orange-500/10'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/50 active:scale-[0.98]'
                      }`}
                  >
                    {pathname === '/dashboard' && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-orange-500 via-pink-500 to-purple-600 rounded-r-full shadow-sm shadow-orange-500/50" />
                    )}

                    <LayoutDashboard className={`w-5 h-5 transition-all ${pathname === '/dashboard' ? 'opacity-100 scale-110' : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'
                      }`} />
                    <span className={`text-[15px] ${pathname === '/dashboard' ? 'font-semibold' : 'font-medium'}`}>
                      Dashboard
                    </span>

                    {pathname === '/dashboard' && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/5 via-pink-500/5 to-purple-600/5 blur-sm" />
                    )}
                  </Link>
                </SignedIn>
              </div>
            </nav>

            {/* Bottom Account Action - Logout */}
            <div className="flex-shrink-0 border-t border-gray-200/60 dark:border-gray-800/60 bg-white/95 dark:bg-black/95 backdrop-blur-xl">
              <div className="px-4 py-4">
                <SignedIn>
                  <SignOutButton>
                    <button
                      className="w-full flex items-center justify-center gap-2 h-12 rounded-xl text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all active:scale-[0.98]"
                      onClick={closeMobileMenu}
                    >
                      <LogOut className="w-5 h-5 opacity-80" />
                      <span className="font-medium">Log out</span>
                    </button>
                  </SignOutButton>
                </SignedIn>

                <SignedOut>
                  <div className="space-y-2.5">
                    <SignUpButton mode="modal">
                      <div className="w-full" onClick={closeMobileMenu}>
                        <GradientButton className="w-full h-12 text-[15px] font-semibold shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300">
                          Sign Up
                        </GradientButton>
                      </div>
                    </SignUpButton>
                    <SignInButton mode="modal">
                      <div className="w-full" onClick={closeMobileMenu}>
                        <GradientButton variant="outline" className="w-full h-12 text-[15px] font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform">
                          Sign In
                        </GradientButton>
                      </div>
                    </SignInButton>
                  </div>
                </SignedOut>
              </div>
            </div>
          </div>

          {/* CSS Animations - Clean, no bounce */}
          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideInRight {
              from {
                transform: translateX(100%);
                opacity: 0.9;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }
          `}</style>
        </>
      )}
    </header>
  )
}

export default Header;