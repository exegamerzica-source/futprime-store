export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-ea-dark/90 backdrop-blur-md border-b-2 border-ea-panel">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <a href="/" className="text-3xl font-black text-white italic tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(26,244,90,0.2)]">
          FUT<span className="text-ea-green">PRIME</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-zinc-400">
          <a href="/#pacotes" className="hover:text-ea-green transition-colors">Pacotes</a>
          <a href="/#metodo" className="hover:text-ea-green transition-colors">MÃ©todo</a>
          <a href="/#avaliacoes" className="hover:text-ea-green transition-colors">AvaliaÃ§Ãµes</a>
          <a href="/#faq" className="hover:text-ea-green transition-colors">FAQ</a>
        </nav>
        <a 
          href="https://wa.me/5544988224755" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-ea-green hover:bg-white text-black px-8 py-3 clip-btn font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(26,244,90,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] text-center flex items-center"
        >
          Suporte
        </a>
      </div>
    </header>
  );
}

