"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    { q: "Existe algum risco de banimento da minha conta?", a: "Não. Utilizamos um método 100% seguro de transferência gradativa através de lances em jogadores, o que simula o comportamento do mercado e evita qualquer tipo de market ban ou coin wipe." },
    { q: "Qual é o prazo de entrega das coins?", a: "Para pedidos padrão, o prazo de entrega varia de 15 a 60 minutos dependendo da quantidade. Faremos de tudo para entregar o mais rápido possível." },
    { q: "Como funciona o método automático?", a: "Nós acessamos o seu WebApp de forma segura, compramos e vendemos as cartas necessárias sem que você precise fazer nada. É tudo automatizado e transparente." },
    { q: "Vocês atendem todas as plataformas?", a: "Sim! Entregamos coins para PS4, PS5, Xbox One, Xbox Series S/X e PC." }
  ];

  return (
    <section className="py-24 max-w-3xl mx-auto px-4">
      <h2 className="text-3xl md:text-5xl font-black text-center mb-12">Perguntas Frequentes</h2>
      
      <div className="flex flex-col gap-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <button 
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full px-6 py-4 flex items-center justify-between font-bold text-left hover:bg-zinc-800/50 transition-colors"
            >
              {faq.q}
              <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="px-6 pb-4 text-zinc-400 text-sm leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
