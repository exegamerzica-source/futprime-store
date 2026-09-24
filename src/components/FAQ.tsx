"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    { q: "Existe algum risco de banimento da minha conta?", a: "Não. Utilizamos um método 100% seguro de transferência gradativa através de lances em jogadores, o que simula o comportamento do mercado e evita qualquer tipo de market ban ou coin wipe." },
    { q: "Em quanto tempo as coins caem na minha conta?", a: "O processo normalmente leva de 10 a 30 minutos após a confirmação do pagamento. Em dias de eventos maiores da EA, pode demorar um pouco mais." },
    { q: "Quais são as formas de pagamento?", a: "Aceitamos PIX (Aprovação imediata) e Cartão de Crédito em até 12x via nosso checkout seguro." },
    { q: "Preciso passar a senha da minha conta?", a: "Para o método Comfort Trade (Automático) sim, é necessário. Mas não se preocupe, a FUT Prime é a maior loja do Brasil e não temos nenhum histórico de problemas. Seus dados são deletados após a entrega." }
  ];

  return (
    <section id="faq" className="w-full max-w-4xl mx-auto py-24 px-4 scroll-mt-20">
      <h2 className="text-3xl font-black italic uppercase tracking-tight text-white mb-10 text-center">
        Dúvidas Frequentes
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all"
          >
            <button 
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full px-6 py-5 flex items-center justify-between font-bold text-left text-zinc-200 hover:text-ea-green transition-colors"
            >
              {faq.q}
              <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? "rotate-180 text-ea-green" : "text-zinc-500"}`} />
            </button>
            
            {open === i && (
              <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800/50 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
