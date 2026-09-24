import { UserPlus, Settings, Clock, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { icon: <UserPlus />, title: "1. Informe seus dados", desc: "Forneça os dados de acesso de forma segura para iniciarmos." },
    { icon: <Settings />, title: "2. Transferência Segura", desc: "Nosso sistema inicia a transferência automatizada evitando bans." },
    { icon: <Clock />, title: "3. Processamento", desc: "Aguarde de 15 a 30 minutos enquanto o processo é finalizado." },
    { icon: <CheckCircle />, title: "4. Coins na Conta!", desc: "Receba uma mensagem de confirmação no WhatsApp com o serviço concluído." }
  ];

  return (
    <div id="metodo" className="w-full max-w-6xl mx-auto py-20 px-4 scroll-mt-20">
      <h2 className="text-3xl md:text-5xl font-black text-center italic tracking-tighter uppercase mb-16 drop-shadow-md">
        COMO FUNCIONA O <span className="text-ea-green">MÉTODO</span>?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent -translate-y-1/2 -z-10" />
        
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center bg-zinc-900/80 backdrop-blur-sm p-6 rounded-2xl border border-zinc-800 hover:border-ea-green transition-all group">
            <div className="w-16 h-16 bg-ea-panel rounded-full flex items-center justify-center text-ea-green mb-6 border-4 border-zinc-950 group-hover:scale-110 group-hover:bg-ea-green group-hover:text-black transition-all shadow-xl">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
