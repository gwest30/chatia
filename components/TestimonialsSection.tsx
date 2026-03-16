export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Marcus T.',
      role: 'Agency Owner, Dallas TX',
      avatar: 'MT',
      color: 'from-purple-500 to-blue-600',
      text: "We were spending $8k/month on SDRs to make follow-up calls. With Chatia.ai, our AI agent handles 300+ calls a day and books 40% more appointments. It's insane.",
      metric: '40% more bookings',
    },
    {
      name: 'Jessica R.',
      role: 'Real Estate Broker',
      avatar: 'JR',
      color: 'from-pink-500 to-rose-600',
      text: "Every new lead in GHL now gets an AI call within 60 seconds, 24 hours a day. My show-up rate went from 30% to 68% in the first month. Chatia.ai is a game changer.",
      metric: '2.3x show-up rate',
    },
    {
      name: 'David K.',
      role: 'SaaS Founder, GHL Reseller',
      avatar: 'DK',
      color: 'from-green-500 to-emerald-600',
      text: "I white-labeled Chatia.ai and now offer it to my GHL sub-accounts. Added $15k MRR in 3 months without any extra staff. The setup was incredibly easy.",
      metric: '$15k MRR added',
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-green-300 mb-6">
            Early Testers Love It
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Real Results From
            <span className="gradient-text"> Real Businesses</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-card rounded-2xl p-6">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg">
                  {t.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
