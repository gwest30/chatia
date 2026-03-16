export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Connect Your CRM',
      desc: 'Link your GoHighLevel account with a single click. Chatia.ai instantly syncs your contacts, pipelines, and workflows.',
      icon: '🔗',
      color: 'from-purple-500 to-blue-600',
    },
    {
      number: '02',
      title: 'Configure Your AI Agent',
      desc: 'Choose your voice, set your script, define call goals, and link your VAPI account. Our wizard makes it effortless.',
      icon: '🤖',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '03',
      title: 'Launch Campaigns',
      desc: 'Trigger outbound call campaigns from GHL workflows, or let AI handle all inbound calls 24/7 automatically.',
      icon: '🚀',
      color: 'from-cyan-500 to-green-500',
    },
    {
      number: '04',
      title: 'Watch Results Roll In',
      desc: 'Track bookings, conversions, and call outcomes in real-time. Every result syncs back to your CRM automatically.',
      icon: '📈',
      color: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 relative">
      <div className="hero-glow w-[500px] h-[400px] bg-blue-600 top-1/2 right-[-100px] -translate-y-1/2 opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-cyan-300 mb-6">
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Live in Minutes,
            <span className="gradient-text"> Not Months</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            No engineers needed. No complex API docs. Just connect, configure, and deploy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-purple-500/50 to-transparent z-0" style={{ width: 'calc(100% - 2rem)', left: '100%' }} />
              )}

              <div className="glass-card rounded-2xl p-6 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-xl`}>
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-white/10">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Demo Placeholder */}
        <div className="mt-16 glass rounded-3xl p-1 overflow-hidden">
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-3xl aspect-video flex items-center justify-center relative">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform animate-pulse-glow">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <div className="text-lg font-bold text-white mb-1">See Chatia.ai in Action</div>
              <div className="text-sm text-gray-400">Watch a 2-minute demo</div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 glass rounded-xl px-3 py-2 text-xs text-green-400">
              ● Live Demo
            </div>
            <div className="absolute bottom-4 right-4 glass rounded-xl px-3 py-2 text-xs text-gray-400">
              2:34
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
