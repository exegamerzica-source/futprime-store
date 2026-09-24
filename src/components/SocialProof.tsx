import { Star } from "lucide-react";

export default function SocialProof() {
  return (
    <section className="py-20 bg-zinc-900 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex text-green-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-6 h-6 fill-current" />
            ))}
          </div>
          <span className="text-xl font-bold">5.0</span>
        </div>
        <p className="text-zinc-300 text-lg mb-12">
          A maior loja de FIFA (EA FC 27) coins do Brasil, com <strong className="text-white">+1.810 avaliações públicas.</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { n: "Carlos M.", t: "Entrega muito rápida, comprei e em menos de 10 min já estava na conta. Recomendo!" },
            { n: "João P.", t: "Primeira vez comprando e foi super tranquilo. Zero risco de ban e atendimento nota 10." },
            { n: "Felipe S.", t: "Sempre compro com eles, os bônus compensam muito mais que comprar FIFA points." }
          ].map((review, idx) => (
            <div key={idx} className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 text-left">
              <div className="flex text-green-500 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-zinc-400 italic mb-4">"{review.t}"</p>
              <span className="font-bold text-white">— {review.n}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
