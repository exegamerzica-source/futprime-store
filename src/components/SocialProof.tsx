import { Star } from "lucide-react";

export default function SocialProof() {
  return (
    <section id="avaliacoes" className="py-20 bg-zinc-900 border-y border-zinc-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex text-green-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-6 h-6 fill-current" />
            ))}
          </div>
          <span className="text-white font-bold text-xl ml-2">4.9/5</span>
        </div>
        
        <h2 className="text-3xl font-black italic uppercase tracking-tight text-white mb-4">
          Mais de 10.000 clientes satisfeitos
        </h2>
        <p className="text-zinc-400 mb-12 max-w-2xl mx-auto">
          Veja o que a comunidade fala sobre a entrega de coins mais rápida e segura do Brasil.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-800/50 p-6 rounded-2xl text-left border border-zinc-700">
            <div className="flex gap-1 text-ea-green mb-3"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
            <p className="text-zinc-300 text-sm mb-4">"Caiu em menos de 10 minutos na minha conta. Muito rápido e suporte atencioso no WhatsApp!"</p>
            <p className="font-bold text-white text-sm">- Lucas Silva</p>
          </div>
          <div className="bg-zinc-800/50 p-6 rounded-2xl text-left border border-zinc-700">
            <div className="flex gap-1 text-ea-green mb-3"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
            <p className="text-zinc-300 text-sm mb-4">"Primeira vez que compro e estava com medo de ban, mas os caras usam o método anti-ban mesmo. Perfeito."</p>
            <p className="font-bold text-white text-sm">- Matheus Henrique</p>
          </div>
          <div className="bg-zinc-800/50 p-6 rounded-2xl text-left border border-zinc-700">
            <div className="flex gap-1 text-ea-green mb-3"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
            <p className="text-zinc-300 text-sm mb-4">"Preço top e entrega absurda. Já comprei 3 vezes esse mês pro meu time."</p>
            <p className="font-bold text-white text-sm">- João Pedro</p>
          </div>
        </div>
      </div>
    </section>
  );
}
