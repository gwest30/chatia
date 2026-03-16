'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'What is Chatia.ai?',
    a: 'Chatia.ai is an AI automation platform that bridges CRM tools like GoHighLevel (GHL) with premium voice AI platforms like VAPI. It lets businesses deploy AI voice agents that handle inbound and outbound calls, book appointments, and sync outcomes back to your CRM — automatically.',
  },
  {
    q: 'Do I need to know how to code?',
    a: 'Not at all. Chatia.ai is built for non-technical users. Our setup wizard walks you through connecting GHL and VAPI in under 5 minutes, with zero coding required.',
  },
  {
    q: 'Which CRMs do you support?',
    a: 'We launch with native GoHighLevel (GHL) integration. Support for HubSpot, Salesforce, Pipedrive, and others is on our roadmap for later in 2025.',
  },
  {
    q: 'What voice AI providers do you support?',
    a: 'We support VAPI natively at launch, with ElevenLabs for voice synthesis. Retell AI and Bland AI integrations are coming soon.',
  },
  {
    q: 'Is white-labeling available?',
    a: 'Yes! Our Agency plan includes full white-label support. You can brand the platform with your logo, colors, and custom domain, then resell access to your clients.',
  },
  {
    q: 'When is Chatia.ai launching?',
    a: 'We are currently in closed beta with select early testers. Joining the waitlist now guarantees you early access and a permanent 60% discount on your chosen plan.',
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-cyan-300 mb-6">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Got Questions?
            <span className="gradient-text"> We Got Answers.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`glass-card rounded-2xl overflow-hidden transition-all ${open === i ? 'border-purple-500/40' : ''}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-white">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-purple-400 flex-shrink-0 ml-4 transition-transform ${open === i ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
