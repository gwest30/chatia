'use client';

import { useState } from 'react';

interface WaitlistFormProps {
  onClose: () => void;
}

export default function WaitlistForm({ onClose }: WaitlistFormProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    useCase: '',
    crmUsed: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Save to localStorage so submissions persist client-side
      const existing = JSON.parse(localStorage.getItem('chatia_waitlist') || '[]');
      const duplicate = existing.find((entry: { email: string }) =>
        entry.email.toLowerCase() === formData.email.trim().toLowerCase()
      );
      if (duplicate) {
        setError('This email is already on the waitlist! Check your inbox for confirmation.');
        setLoading(false);
        return;
      }
      existing.push({ ...formData, joinedAt: new Date().toISOString() });
      localStorage.setItem('chatia_waitlist', JSON.stringify(existing));
      setStep('success');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg glass rounded-3xl overflow-hidden shadow-2xl">
        {/* Purple top border */}
        <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" />

        <div className="p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {step === 'form' ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center animate-pulse-glow">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <span className="text-xl font-black gradient-text">Chatia.ai</span>
                </div>
                <h2 className="text-2xl font-black text-white mb-1">Join the Waitlist</h2>
                <p className="text-gray-400 text-sm">Get early access + 60% off founder pricing</p>
              </div>

              {/* Perks */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: '🎯', text: 'Early Access' },
                  { icon: '💰', text: '60% Off' },
                  { icon: '🏆', text: 'Founder Perks' },
                ].map((perk) => (
                  <div key={perk.text} className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-xl mb-1">{perk.icon}</div>
                    <div className="text-xs text-gray-400 font-medium">{perk.text}</div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Smith"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@agency.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Company / Agency</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="My Agency LLC"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Your Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500/50 transition-all appearance-none"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" className="bg-gray-900">Select role</option>
                      <option value="agency_owner" className="bg-gray-900">Agency Owner</option>
                      <option value="marketer" className="bg-gray-900">Marketer</option>
                      <option value="sales" className="bg-gray-900">Sales Professional</option>
                      <option value="developer" className="bg-gray-900">Developer</option>
                      <option value="business_owner" className="bg-gray-900">Business Owner</option>
                      <option value="other" className="bg-gray-900">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">CRM You Use</label>
                  <select
                    value={formData.crmUsed}
                    onChange={(e) => setFormData({ ...formData, crmUsed: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500/50 transition-all appearance-none"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" className="bg-gray-900">Select your CRM</option>
                    <option value="ghl" className="bg-gray-900">GoHighLevel (GHL)</option>
                    <option value="hubspot" className="bg-gray-900">HubSpot</option>
                    <option value="salesforce" className="bg-gray-900">Salesforce</option>
                    <option value="pipedrive" className="bg-gray-900">Pipedrive</option>
                    <option value="none" className="bg-gray-900">No CRM yet</option>
                    <option value="other" className="bg-gray-900">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Main Use Case</label>
                  <select
                    value={formData.useCase}
                    onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500/50 transition-all appearance-none"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" className="bg-gray-900">What will you use it for?</option>
                    <option value="lead_followup" className="bg-gray-900">Automated Lead Follow-up</option>
                    <option value="appointment_booking" className="bg-gray-900">Appointment Booking</option>
                    <option value="inbound_handling" className="bg-gray-900">Inbound Call Handling</option>
                    <option value="outbound_campaigns" className="bg-gray-900">Outbound Campaigns</option>
                    <option value="white_label" className="bg-gray-900">White-Label Reselling</option>
                    <option value="other" className="bg-gray-900">Other</option>
                  </select>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-4 rounded-2xl font-bold text-white relative z-10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Securing Your Spot...
                    </>
                  ) : (
                    <>
                      Secure My Early Access
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-600 text-center">
                  No spam. No credit card. Unsubscribe anytime.
                </p>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="py-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-white mb-3">You&apos;re On the List!</h2>
              <p className="text-gray-400 mb-2">
                Welcome aboard, <span className="text-white font-semibold">{formData.name}</span>!
              </p>
              <p className="text-gray-400 text-sm mb-6">
                We&apos;ve saved your spot and reserved your 60% founder discount.
                Check your inbox at <span className="text-purple-400">{formData.email}</span> for a confirmation.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { icon: '🚀', label: 'Early Access', desc: 'First to launch' },
                  { icon: '💰', label: '60% Off', desc: 'Locked forever' },
                  { icon: '🎯', label: 'Priority', desc: 'Onboarding call' },
                ].map((perk) => (
                  <div key={perk.label} className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-2xl mb-1">{perk.icon}</div>
                    <div className="text-xs font-bold text-white">{perk.label}</div>
                    <div className="text-xs text-gray-500">{perk.desc}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={onClose}
                className="btn-primary px-8 py-3 rounded-xl font-bold text-white relative z-10"
              >
                Awesome, Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
