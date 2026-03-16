interface PricingProps {
  onJoinWaitlist: () => void;
}

export default function PricingSection({ onJoinWaitlist }: PricingProps) {
  const plans = [
    {
      name: 'Starter',
      price: '97',
      desc: 'Perfect for solo agencies getting started with AI voice automation.',
      color: 'from-blue-500 to-cyan-500',
      features: [
        '1 AI Voice Agent',
        'Up to 500 calls/month',
        'GHL Integration',
        'VAPI Connection',
        'Basic Analytics',
        'Email Support',
      ],
      popular: false,
    },
    {
      name: 'Growth',
      price: '297',
      desc: 'For scaling agencies running multiple campaigns and clients.',
      color: 'from-purple-500 to-blue-600',
      features: [
        '5 AI Voice Agents',
        'Up to 5,000 calls/month',
        'GHL + All CRM Integrations',
        'VAPI + ElevenLabs',
        'Advanced Analytics',
        'White-Label Ready',
        'Priority Support',
        'Campaign Templates',
      ],
      popular: true,
    },
    {
      name: 'Agency',
      price: '697',
      desc: 'White-label for agencies reselling to multiple clients.',
      color: 'from-green-500 to-emerald-600',
      features: [
        'Unlimited AI Voice Agents',
        'Unlimited Calls',
        'All Integrations',
        'Full White-Label',
        'Sub-Account Management',
        'API Access',
        'Dedicated Onboarding',
        '24/7 Slack Support',
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-yellow-300 mb-6">
            Simple Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Join Waitlist for
            <span className="gradient-text"> Founder Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Waitlist members lock in up to 60% off launch pricing — forever.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative glass-card rounded-2xl p-6 ${plan.popular ? 'border-purple-500/50' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <div className="mb-4">
                <div className="text-lg font-bold text-white">{plan.name}</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-black text-white">${plan.price}</span>
                  <span className="text-gray-500 text-sm">/month</span>
                </div>
                <div className="text-xs text-purple-400 mt-1">Waitlist: lock in 60% off</div>
              </div>

              <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={onJoinWaitlist}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  plan.popular
                    ? 'btn-primary text-white relative z-10'
                    : 'glass hover:bg-white/10 text-white'
                }`}
              >
                Join Waitlist
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          All prices are pre-launch estimates. Final pricing set at launch. Waitlist members guaranteed 60% discount.
        </p>
      </div>
    </section>
  );
}
