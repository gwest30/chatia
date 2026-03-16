'use client';

interface HeroProps {
  onJoinWaitlist: () => void;
}

export default function HeroSection({ onJoinWaitlist }: HeroProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-purple-300 mb-8 animate-fade-in-up">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Now connecting GHL + VAPI — Join Early Access
      </div>

      {/* Headline */}
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05] max-w-5xl animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
        Automate Every
        <br />
        <span className="gradient-text">Client Call</span>
        <br />
        With AI
      </h1>

      <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
        Chatia.ai bridges your CRM with premium voice AI — so your business
        handles inbound &amp; outbound calls 24/7, without lifting a finger.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
        <button
          onClick={onJoinWaitlist}
          className="btn-primary px-8 py-4 rounded-2xl text-lg font-bold text-white relative z-10 flex items-center gap-3 justify-center"
        >
          <span>Get Early Access</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        <a
          href="#features"
          className="px-8 py-4 rounded-2xl text-lg font-semibold glass hover:bg-white/10 transition-all flex items-center gap-2 justify-center"
        >
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          See How It Works
        </a>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
        {[
          { value: '10x', label: 'Faster Lead Response' },
          { value: '24/7', label: 'Always-On AI Calls' },
          { value: '90%', label: 'Cost Reduction' },
          { value: '500+', label: 'Businesses Waitlisted' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-black gradient-text">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Hero Visual — AI Voice Visualization */}
      <div className="relative w-full max-w-4xl animate-float">
        <div className="glass rounded-3xl p-8 relative overflow-hidden">
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            {/* Left: CRM Panel */}
            <div className="flex-1 glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">GoHighLevel CRM</div>
                  <div className="text-xs text-green-400">● Connected</div>
                </div>
              </div>
              <div className="space-y-2">
                {['New Lead: John D.', 'Follow-up: Sarah M.', 'Appointment: Mike R.'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 rounded-lg px-3 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Center: Connection */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl btn-primary flex items-center justify-center animate-pulse-glow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-xs text-purple-400 font-bold">Chatia.ai</div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-purple-500 wave-bar"
                    style={{
                      height: `${[16, 24, 32, 24, 16][i - 1]}px`,
                      animationDelay: `${(i - 1) * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: VAPI Panel */}
            <div className="flex-1 glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">VAPI Voice AI</div>
                  <div className="text-xs text-green-400">● Active Call</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-purple-900/30 rounded-lg px-3 py-2">
                  <div className="text-xs text-purple-300 mb-1">AI Agent says:</div>
                  <div className="text-xs text-white">&ldquo;Hi John, calling about your inquiry...&rdquo;</div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Duration: 02:34</span>
                  <span className="text-green-400">Appointment booked ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
