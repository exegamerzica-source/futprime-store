"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { CreditCard, QrCode, ShieldCheck, ChevronLeft, Coins, CheckCircle2, MessageCircle } from "lucide-react";
import Link from "next/link";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const item = searchParams.get("item") || "Moedas";
  const price = searchParams.get("price") || "0.00";
  const platform = searchParams.get("platform") || "PS/XBOX";

  const [paymentMethod, setPaymentMethod] = useState<"cartao" | "pix" | "whatsapp" | null>(null);
  const [formData, setFormData] = useState({ nome: "", cpf: "", email: "", whatsapp: "" });
  const [pixGenerated, setPixGenerated] = useState(false);

  const isFormValid = formData.nome.length > 3 && formData.cpf.length >= 11 && formData.email.includes("@") && formData.whatsapp.length >= 10;

  useEffect(() => {
    if (isFormValid && typeof window !== 'undefined' && window.PayFlow) {
      window.PayFlow.init();
    }
  }, [isFormValid, paymentMethod]);

  const saveOrderToLocalStorage = (method: string) => {
    const existingOrders = JSON.parse(localStorage.getItem("futprime_orders") || "[]");
    localStorage.setItem("futprime_orders", JSON.parse(JSON.stringify([...existingOrders, {
      id: "PED-" + Math.floor(Math.random() * 10000),
      item, price, platform, method,
      customer: formData,
      status: "Pendente",
      date: new Date().toISOString()
    }])));
  };

  const handleCartaoClick = (e: React.MouseEvent) => {
    if (!isFormValid) {
      e.preventDefault();
      alert("Preencha todos os seus dados antes de prosseguir para o pagamento.");
      return;
    }
    setPaymentMethod("cartao");
    saveOrderToLocalStorage("cartao");
    
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.PayFlow && !document.querySelector('#payflow-modal-container')) {
         const payflowUrl = `https://linkmy-pay-vert.vercel.app/pay/dynamic?name=${encodeURIComponent(`${item} - ${platform}`)}&amount=${encodeURIComponent(price)}&customer_name=${encodeURIComponent(formData.nome)}&customer_email=${encodeURIComponent(formData.email)}&customer_cpf=${encodeURIComponent(formData.cpf.replace(/\D/g, ""))}`;
         window.PayFlow.open(payflowUrl, `Cliente: ${formData.nome}`);
      }
    }, 500);
  };

  const generatePix = () => {
    if (!isFormValid) {
      alert("Preencha todos os dados primeiro!");
      return;
    }
    setPixGenerated(true);
    saveOrderToLocalStorage("pix");
  };

  const payWithWhatsApp = () => {
    if (!isFormValid) {
      alert("Preencha todos os dados primeiro!");
      return;
    }
    saveOrderToLocalStorage("whatsapp");
    const text = encodeURIComponent(`Olá, quero comprar ${item} de FC 27 para ${platform}. Valor: R$ ${price}. Meu nome é ${formData.nome}.`);
    window.open(`https://wa.me/5511999999999?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#07090b] text-white selection:bg-ea-green selection:text-black pb-20">
      <header className="bg-zinc-950 border-b border-zinc-900 py-6 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
            <ChevronLeft className="w-4 h-4" /> Voltar à loja
          </Link>
          <div className="text-xl font-black italic tracking-tighter uppercase text-white">
            FUT<span className="text-ea-green">PRIME</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-ea-green font-bold uppercase tracking-widest bg-ea-green/10 px-4 py-2 rounded-full border border-ea-green/20">
            <ShieldCheck className="w-4 h-4" /> Pagamento Seguro
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-12 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-12">
          
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-ea-green/20 p-2 rounded-lg text-ea-green font-black">1</div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Seus Dados</h2>
            </div>
            <div className="space-y-4 bg-ea-panel border border-zinc-800 p-8 rounded-3xl shadow-xl">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  value={formData.nome}
                  onChange={e => setFormData({...formData, nome: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:border-ea-green focus:ring-1 focus:ring-ea-green outline-none transition-all placeholder:text-zinc-600" 
                  placeholder="Digite seu nome"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">CPF</label>
                  <input 
                    type="text" 
                    value={formData.cpf}
                    onChange={e => setFormData({...formData, cpf: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:border-ea-green outline-none transition-all placeholder:text-zinc-600" 
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">WhatsApp</label>
                  <input 
                    type="text" 
                    value={formData.whatsapp}
                    onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:border-ea-green outline-none transition-all placeholder:text-zinc-600" 
                    placeholder="(11) 90000-0000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">E-mail</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:border-ea-green outline-none transition-all placeholder:text-zinc-600" 
                  placeholder="seu@email.com"
                />
              </div>
            </div>
          </section>

          <section className={!isFormValid ? "opacity-50 transition-opacity" : "transition-opacity"}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-ea-green/20 p-2 rounded-lg text-ea-green font-black">2</div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Forma de Pagamento</h2>
            </div>

            <div className="space-y-4">
              
              <button 
                onClick={handleCartaoClick}
                data-payflow-product={`${item} - ${platform}`}
                data-payflow-price={price}
                data-payflow-color="#1af45a"
                data-payflow-label="Finalizar com Cartão"
                className={`w-full flex items-center gap-4 bg-zinc-900 border ${paymentMethod === "cartao" ? "border-ea-green bg-zinc-800" : "border-zinc-800 hover:border-zinc-600"} p-5 rounded-2xl transition-all cursor-pointer`}
              >
                <div className="bg-blue-500/20 p-4 rounded-xl text-blue-400">
                  <CreditCard className="w-6 h-6 pointer-events-none" />
                </div>
                <div className="text-left flex-1 pointer-events-none">
                  <strong className="block text-white font-black uppercase tracking-wide">Cartão de Crédito</strong>
                  <span className="text-zinc-400 text-sm">Aprovação imediata (Processado via PayFlow)</span>
                </div>
                {paymentMethod === "cartao" && <CheckCircle2 className="text-ea-green w-6 h-6 pointer-events-none" />}
              </button>

              <div className={`w-full bg-zinc-900 border ${paymentMethod === "pix" ? "border-ea-green bg-zinc-800" : "border-zinc-800 hover:border-zinc-600"} rounded-2xl transition-all overflow-hidden`}>
                <button 
                  onClick={() => setPaymentMethod("pix")} 
                  className="w-full flex items-center gap-4 p-5"
                >
                  <div className="bg-ea-green/20 p-4 rounded-xl text-ea-green">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <div className="text-left flex-1">
                    <strong className="block text-white font-black uppercase tracking-wide">PIX Copia e Cola</strong>
                    <span className="text-zinc-400 text-sm">Aprovação em até 10 segundos</span>
                  </div>
                  {paymentMethod === "pix" && <CheckCircle2 className="text-ea-green w-6 h-6" />}
                </button>

                {paymentMethod === "pix" && (
                  <div className="p-6 border-t border-zinc-800 bg-zinc-950 flex flex-col items-center">
                    {!pixGenerated ? (
                      <button onClick={generatePix} className="w-full bg-ea-green hover:bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg">
                        Gerar Código PIX
                      </button>
                    ) : (
                      <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <div className="bg-white p-4 rounded-2xl mb-6 shadow-[0_0_30px_rgba(26,244,90,0.1)] relative">
                          <QrCode className="w-48 h-48 text-black" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <ShieldCheck className="w-32 h-32 text-black" />
                          </div>
                        </div>
                        <p className="text-zinc-400 text-sm text-center mb-4">
                          Escaneie o QR Code ou copie a chave PIX abaixo para pagar. O pedido será aprovado automaticamente.
                        </p>
                        <div className="w-full max-w-md flex items-center bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden mb-2">
                          <code className="flex-1 text-xs text-ea-green p-4 truncate">
                            00020126580014br.gov.bcb.pix0136{Math.random().toString(36).substring(2, 15)}...
                          </code>
                          <button onClick={() => alert("Chave copiada!")} className="bg-ea-green hover:bg-white text-black font-bold px-6 py-4 uppercase text-xs tracking-wider transition-colors">
                            Copiar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button 
                onClick={() => { setPaymentMethod("whatsapp"); payWithWhatsApp(); }} 
                className={`w-full flex items-center gap-4 bg-zinc-900 border ${paymentMethod === "whatsapp" ? "border-green-500 bg-zinc-800" : "border-zinc-800 hover:border-zinc-600"} p-5 rounded-2xl transition-all`}
              >
                <div className="bg-green-500/20 p-4 rounded-xl text-green-500">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="text-left flex-1">
                  <strong className="block text-white font-black uppercase tracking-wide">Finalizar no WhatsApp</strong>
                  <span className="text-zinc-400 text-sm">Atendimento humano especializado</span>
                </div>
                {paymentMethod === "whatsapp" && <CheckCircle2 className="text-green-500 w-6 h-6" />}
              </button>
            </div>
          </section>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-ea-panel border border-zinc-800 rounded-3xl p-8 sticky top-8 shadow-2xl">
            <h3 className="text-xl font-black uppercase tracking-widest mb-6 border-b border-zinc-800 pb-4">Resumo do Pedido</h3>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl flex items-center justify-center">
                <Coins className="w-8 h-8 text-ea-green" />
              </div>
              <div>
                <h4 className="font-bold text-lg">{item}</h4>
                <p className="text-zinc-400 text-sm uppercase tracking-wider">Plataforma: {platform}</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-zinc-300 border-b border-zinc-800 pb-6 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {price.replace(".", ",")}</span>
              </div>
              <div className="flex justify-between text-ea-green font-medium">
                <span>Taxas Anti-Ban</span>
                <span>Grátis</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="text-zinc-400 uppercase tracking-widest text-sm font-bold">Total a pagar</span>
              <span className="text-4xl font-black text-white italic tracking-tight">R$ {price.replace(".", ",")}</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-ea-green" />
              Ambiente 100% Criptografado
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07090b] text-white flex items-center justify-center font-bold uppercase tracking-widest">Carregando checkout seguro...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
