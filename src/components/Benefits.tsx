import { ShieldCheck, PiggyBank, BadgeCheck, Gift } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-500" />,
      title: "Método Zero Ban",
      desc: "Transferência monitorada do começo ao fim para garantir que sua conta fique 100% segura."
    },
    {
      icon: <PiggyBank className="w-10 h-10 text-ea-green" />,
      title: "O Melhor Preço do Brasil",
      desc: "Cobrimos a concorrência. Não existe preço menor e com a mesma segurança."
    },
    {
      icon: <BadgeCheck className="w-10 h-10 text-blue-500" />,
      title: "Entrega Expressa",
      desc: "95% dos nossos pedidos são concluídos em menos de 30 minutos."
    },
    {
      icon: <Gift className="w-10 h-10 text-purple-500" />,
      title: "Bônus Extremos",
      desc: "Quanto mais você compra, mais moedas bônus ganha na sua conta."
    }
  ];

  return (
    <section className="bg-ea-dark border-y border-zinc-800 py-16 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-ea-green/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((b, i) => (
          <div key={i} className="flex flex-col gap-4 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:bg-zinc-900 transition-colors">
            {b.icon}
            <h3 className="text-xl font-bold text-white">{b.title}</h3>
            <p className="text-zinc-400 text-sm">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
