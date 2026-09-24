import { UserPlus, Settings, Clock, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { icon: <UserPlus />, title: "1. Informe seus dados", desc: "Forneça os dados de acesso de forma segura para iniciarmos." },
    { icon: <Settings />, title: "2. Transferência Segura", desc: "Nosso sistema inicia a transferência automatizada evitando bans." },
    { icon: <Clock />, title: "3. Processamento", desc: "Aguarde de 15 a 30 minutos enquanto o processo é finalizado." },
    { icon: <CheckCircle />, title: "4. Coins na Conta!", desc: "Receba uma mensagem de confirmação no WhatsApp com o serviço concluído." }
  ];

  return (
    <section className="py-24 bg-zinc-900 border-y border-zinc-800 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-16">Como funciona a mágica?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-black mb-6 z-10 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-zinc-400 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
