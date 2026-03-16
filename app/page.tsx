'use client';

import { useState } from 'react';
import WaitlistForm from '@/components/WaitlistForm';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import IntegrationsSection from '@/components/IntegrationsSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />

      {/* Purple glow top */}
      <div className="hero-glow w-[800px] h-[600px] bg-purple-600 top-[-200px] left-1/2 -translate-x-1/2 z-0" />
      {/* Blue glow bottom right */}
      <div className="hero-glow w-[500px] h-[500px] bg-blue-600 bottom-[20%] right-[-100px] z-0" />
      {/* Cyan glow left */}
      <div className="hero-glow w-[400px] h-[400px] bg-cyan-500 top-[40%] left-[-100px] z-0" />

      <div className="relative z-10">
        <Navbar onJoinWaitlist={() => setWaitlistOpen(true)} />
        <HeroSection onJoinWaitlist={() => setWaitlistOpen(true)} />
        <IntegrationsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection onJoinWaitlist={() => setWaitlistOpen(true)} />
        <FaqSection />

        {/* CTA Section */}
        <section className="py-32 px-6 text-center relative overflow-hidden">
          <div className="hero-glow w-[600px] h-[400px] bg-purple-600 top-0 left-1/2 -translate-x-1/2" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-purple-300 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Limited Early Access Available
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Ready to Transform Your
              <br />
              <span className="gradient-text">Voice AI Business?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Join hundreds of agencies and businesses already on the waitlist.
              Be the first to automate client calls with intelligence.
            </p>
            <button
              onClick={() => setWaitlistOpen(true)}
              className="btn-primary px-10 py-5 rounded-2xl text-lg font-bold text-white relative z-10 inline-flex items-center gap-3"
            >
              <span>Join the Waitlist</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <p className="mt-4 text-sm text-gray-500">Free to join. No credit card required.</p>
          </div>
        </section>

        <Footer />
      </div>

      {/* Waitlist Modal */}
      {waitlistOpen && (
        <WaitlistForm onClose={() => setWaitlistOpen(false)} />
      )}
    </main>
  );
}
