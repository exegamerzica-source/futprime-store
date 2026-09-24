"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Gamepad2, Zap, ShieldCheck, Coins, SlidersHorizontal, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type Platform = "playstation" | "xbox" | "pc";

interface Package {
  id: string;
  coins: string;
  bonus: string;
  oldPrice: number;
  price: number;
  tier: "standard" | "gold" | "ultimate";
  numericCoins: number;
}

const getPackagesForPlatform = (platform: Platform): Package[] => {
  // PlayStation e Xbox têm os mesmos preços, PC é diferente.
  const isPC = platform === "pc";
  return [
    { id: "p1", coins: "100K", bonus: "30K BÔNUS", oldPrice: isPC ? 160.00 : 151.13, price: isPC ? 128.00 : 120.90, tier: "standard", numericCoins: 100000 },
    { id: "p2", coins: "300K", bonus: "90K BÔNUS", oldPrice: isPC ? 480.00 : 453.38, price: isPC ? 384.00 : 362.70, tier: "standard", numericCoins: 300000 },
    { id: "p3", coins: "500K", bonus: "150K BÔNUS", oldPrice: isPC ? 800.00 : 755.63, price: isPC ? 640.00 : 604.50, tier: "gold", numericCoins: 500000 },
    { id: "p4", coins: "1000K", bonus: "300K BÔNUS", oldPrice: isPC ? 1600.00 : 1511.25, price: isPC ? 1280.00 : 1209.00, tier: "ultimate", numericCoins: 1000000 },
  ];
};

const RATE_PER_1K = {
  playstation: 1.209,
  xbox: 1.209,
  pc: 1.28
};

export default function PricingGrid() {
  const [platform, setPlatform] = useState<Platform>("playstation");
  const [customAmount, setCustomAmount] = useState<number>(40); // in thousands
  const router = useRouter();

  const customPrice = customAmount * RATE_PER_1K[platform];
  const packages = getPackagesForPlatform(platform);

  const handleCheckout = (title: string, price: number) => {
    // Redireciona para a página de checkout real com parâmetros
    const searchParams = new URLSearchParams({
      item: title,
      price: price.toFixed(2),
      platform: platform
    });
    router.push(`/checkout?${searchParams.toString()}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      
      {/* Toggle de Plataforma (3 categorias agora) */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full mb-10 bg-ea-panel/80 backdrop-blur-md p-2 rounded-2xl border border-zinc-800 shadow-2xl">
        <div className="flex p-1 bg-zinc-900 rounded-xl w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setPlatform("playstation")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              platform === "playstation"
                ? "bg-[#00439c] text-white shadow-[0_0_15px_rgba(0,67,156,0.5)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
            PlayStation
          </button>
          <button
            onClick={() => setPlatform("xbox")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              platform === "xbox"
                ? "bg-[#107c10] text-white shadow-[0_0_15px_rgba(16,124,16,0.5)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
            Xbox
          </button>
          <button
            onClick={() => setPlatform("pc")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              platform === "pc"
                ? "bg-ea-green text-black shadow-[0_0_15px_rgba(26,244,90,0.3)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Monitor className="w-5 h-5" />
            PC
          </button>
        </div>
        
        <div className="hidden lg:flex items-center gap-2 px-6 text-zinc-300 text-sm font-medium">
          <ShieldCheck className="w-5 h-5 text-ea-green" />
          Transação 100% Monitorada e Anti-Ban
        </div>
      </div>

      {/* Grid de Pacotes */}
      <div className="w-full relative perspective-1000 mb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={platform}
            initial={{ opacity: 0, rotateX: -10, y: 20 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: 10, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-2 sm:px-0"
          >
            {packages.map((pkg) => {
              let cardBg = "bg-gradient-to-b from-zinc-800 to-ea-panel border-zinc-700";
              let titleColor = "text-white";
              let badgeColor = "bg-ea-green text-black";
              let glow = "hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]";

              if (pkg.tier === "gold") {
                cardBg = "bg-gradient-to-b from-[#e1b74c] via-[#8c6b22] to-[#2a220a] border-[#ffd700]";
                titleColor = "text-[#fff2a8] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]";
                badgeColor = "bg-white text-black";
                glow = "shadow-[0_0_40px_rgba(225,183,76,0.3)] hover:shadow-[0_0_50px_rgba(225,183,76,0.5)] z-10 lg:scale-105";
              } else if (pkg.tier === "ultimate") {
                cardBg = "bg-gradient-to-b from-[#4a1c6a] via-[#210934] to-black border-[#9d4edd]";
                titleColor = "text-[#e0aaff] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]";
                badgeColor = "bg-[#9d4edd] text-white";
                glow = "hover:shadow-[0_0_40px_rgba(157,78,221,0.4)]";
              }

              return (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col rounded-2xl border-2 p-1 transition-all duration-300 hover:-translate-y-2 ${cardBg} ${glow}`}
                >
                  {pkg.tier === "gold" && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-300 to-yellow-600 text-black text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg border border-yellow-200 whitespace-nowrap">
                      O Mais Vendido
                    </div>
                  )}
                  {pkg.tier === "ultimate" && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-purple-800 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg border border-purple-400 whitespace-nowrap">
                      Custo x Benefício
                    </div>
                  )}

                  <div className="bg-ea-panel/90 backdrop-blur-sm rounded-xl p-5 sm:p-6 flex flex-col h-full items-center text-center relative overflow-hidden">
                    <Coins className="absolute -right-6 -top-6 w-32 h-32 opacity-5 text-white" />

                    <div className="flex items-center gap-2 mt-4 mb-1">
                      <Coins className={`w-6 h-6 sm:w-8 sm:h-8 ${pkg.tier === "gold" ? "text-yellow-400" : pkg.tier === "ultimate" ? "text-purple-400" : "text-ea-green"}`} />
                      <h3 className={`text-4xl sm:text-5xl font-black italic tracking-tighter ${titleColor}`}>
                        {pkg.coins}
                      </h3>
                    </div>
                    
                    <div className={`mt-2 mb-6 px-3 py-1 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-md ${badgeColor}`}>
                      + {pkg.bonus}
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent mb-6" />

                    <div className="flex flex-col items-center mb-8 flex-grow">
                      <span className="text-zinc-400 line-through text-xs sm:text-sm font-medium mb-1">
                        De R$ {pkg.oldPrice.toFixed(2).replace(".", ",")}
                      </span>
                      <span className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-start">
                        <span className="text-lg sm:text-xl text-zinc-400 mr-1 mt-1">R$</span>
                        {pkg.price.toFixed(2).replace(".", ",")}
                      </span>
                    </div>

                    <button 
                      onClick={() => handleCheckout(`${pkg.coins} Coins`, pkg.price)}
                      className={`w-full py-3 sm:py-4 rounded-xl text-sm sm:text-base font-black uppercase tracking-widest transition-all flex justify-center items-center gap-2 ${
                        pkg.tier === "gold"
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black shadow-lg"
                          : pkg.tier === "ultimate"
                          ? "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 text-white shadow-lg"
                          : "bg-ea-green hover:bg-white text-black shadow-lg"
                      }`}
                    >
                      <ArrowRight className="w-4 h-4 fill-current" />
                      Comprar Agora
                    </button>
                    
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 mt-4 font-medium uppercase tracking-wider">
                      Redirecionamento Seguro
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Seção de Quantidade Personalizada */}
      <div className="w-full max-w-3xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 sm:p-10 mb-10 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-6">
          <div>
            <h3 className="text-2xl font-black italic tracking-tight text-white mb-2 flex items-center gap-2">
              <SlidersHorizontal className="text-ea-green" />
              QUANTIDADE PERSONALIZADA
            </h3>
            <p className="text-zinc-400 text-sm">Escolha exatamente quantas coins você precisa (Mínimo 40K).</p>
          </div>
          <div className="text-right bg-zinc-950 p-4 rounded-2xl border border-zinc-800 min-w-[200px]">
            <span className="block text-zinc-500 text-xs font-bold uppercase mb-1">Valor Total</span>
            <span className="text-3xl font-black text-ea-green">R$ {customPrice.toFixed(2).replace(".", ",")}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between text-white font-bold text-lg">
            <span>{customAmount}K Coins</span>
            <span>+ Bônus Proporcional</span>
          </div>
          <input 
            type="range" 
            min="40" 
            max="5000" 
            step="10"
            value={customAmount}
            onChange={(e) => setCustomAmount(Number(e.target.value))}
            className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-ea-green hover:accent-emerald-400 transition-all"
          />
          <button 
            onClick={() => handleCheckout(`${customAmount}K Coins Personalizado`, customPrice)}
            className="w-full bg-ea-green hover:bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(26,244,90,0.2)] flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5 fill-current" />
            Prosseguir para o Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
