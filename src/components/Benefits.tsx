import { ShieldCheck, PiggyBank, BadgeCheck, Gift } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-500" />,
      title: "Método Zero Ban",
      desc: "Transferência monitorada do começo ao fim para garantir que sua conta fique 100% segura."
    },
    {
      icon: <PiggyBank className="w-10 h-10 text-green-500" />,
      title: "Economia Inteligente",
      desc: "Compre coins diretamente. Muito mais barato e garantido do que tentar a sorte nos pacotes de FIFA Points."
    },
    {
      icon: <BadgeCheck className="w-10 h-10 text-green-500" />,
      title: "Garantia Total",
      desc: "Se houver qualquer problema na entrega das suas coins, nós garantimos o seu reembolso integral."
    },
    {
      icon: <Gift className="w-10 h-10 text-green-500" />,
      title: "Bônus Exclusivos",
      desc: "Ganhe bônus gigantes em todas as compras. Quanto mais você compra, mais moedas grátis recebe."
    }
  ];

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black mb-4">Por que escolher a nossa loja?</h2>
        <p className="text-zinc-400 text-lg">A estrutura mais completa e segura do mercado de coins.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((b, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-green-500/50 transition-colors">
            <div className="mb-6 p-4 bg-zinc-950 rounded-full border border-zinc-800">
              {b.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{b.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
