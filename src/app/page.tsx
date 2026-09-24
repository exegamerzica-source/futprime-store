import Header from "@/components/Header";
import PricingGrid from "@/components/PricingGrid";
import SocialProof from "@/components/SocialProof";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07090b] text-white font-sans selection:bg-ea-green/30 relative overflow-hidden">
      
      {/* Elementos de Fundo Híbridos (Fifa + E-commerce Premium) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20">
        {/* Luz de estúdio superior */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-gradient-to-b from-ea-green/10 via-transparent to-transparent blur-[100px]" />
        
        {/* Mesh Gradient escuro simulando fumaça/ambientação */}
        <div className="absolute top-1/4 left-[-20%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-[-20%] w-[50vw] h-[50vw] bg-ea-green/5 rounded-full blur-[120px] mix-blend-screen" />
        
        {/* Textura sutil de padrão FIFA */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-44 pb-28 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
          
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-ea-green/30 bg-ea-green/10 text-ea-green text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(26,244,90,0.2)]">
            A Maior Loja de Coins do Brasil
          </div>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 max-w-4xl leading-[0.9] italic text-white drop-shadow-2xl">
            MONTE O SEU <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ea-green to-emerald-300 block mt-2">DREAM TEAM HOJE</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-300 mb-14 max-w-2xl font-medium drop-shadow-md">
            Compre moedas FC de forma 100% segura para PS5, Xbox e PC. Método anti-ban comprovado e envio imediato.
          </p>
          
          <PricingGrid />
        </section>

        {/* Separador de Seção */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        <SocialProof />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        
        <Benefits />
        <HowItWorks />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
