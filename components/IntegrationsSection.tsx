export default function IntegrationsSection() {
  const integrations = [
    { name: 'GoHighLevel', desc: 'CRM & Automation', color: 'from-orange-400 to-red-500', icon: '🏆' },
    { name: 'VAPI', desc: 'Voice AI Platform', color: 'from-purple-500 to-blue-600', icon: '🎙️' },
    { name: 'Twilio', desc: 'Phone & SMS', color: 'from-red-500 to-pink-600', icon: '📞' },
    { name: 'Eleven Labs', desc: 'Voice Synthesis', color: 'from-blue-500 to-cyan-500', icon: '🔊' },
    { name: 'OpenAI', desc: 'LLM Intelligence', color: 'from-green-500 to-emerald-600', icon: '🧠' },
    { name: 'Zapier', desc: 'Workflow Automation', color: 'from-orange-500 to-yellow-500', icon: '⚡' },
    { name: 'Stripe', desc: 'Billing & Payments', color: 'from-indigo-500 to-purple-600', icon: '💳' },
    { name: 'Make.com', desc: 'No-Code Automation', color: 'from-violet-500 to-purple-700', icon: '🔧' },
  ];

  return (
    <section id="integrations" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-blue-300 mb-6">
            Plug &amp; Play Integrations
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Connects With Your
            <span className="gradient-text"> Entire Stack</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Chatia.ai integrates natively with the tools your agency already uses — no custom dev work needed.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {integrations.map((integration) => (
            <div key={integration.name} className="integration-badge rounded-2xl p-5 text-center cursor-pointer">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-2xl mx-auto mb-3`}>
                {integration.icon}
              </div>
              <div className="font-bold text-white text-sm">{integration.name}</div>
              <div className="text-xs text-gray-500 mt-1">{integration.desc}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">+ 50 more integrations coming soon</p>
        </div>
      </div>
    </section>
  );
}
