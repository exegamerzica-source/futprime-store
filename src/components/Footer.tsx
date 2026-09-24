import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-12 border-t border-zinc-800 text-center md:text-left px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="text-2xl font-black text-white italic tracking-tighter mb-4">
            FUT<span className="text-ea-green">PRIME</span>
          </div>
          <p className="text-zinc-400 text-sm">
            A sua loja de confiança para compra de moedas EA FC. Segurança, rapidez e os melhores preços.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-white">Contato Rápido</h4>
          <ul className="text-zinc-400 text-sm space-y-2">
            <li>E-mail: suporte@futprime.com.br</li>
            <li>Horário de Funcionamento: 24/7</li>
            <li>WhatsApp: (11) 99999-9999</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-white">Legal</h4>
          <ul className="text-zinc-400 text-sm space-y-2 flex flex-col">
            <li>
              <Link href="/termos" className="hover:text-ea-green transition-colors">
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link href="/privacidade" className="hover:text-ea-green transition-colors">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="text-center text-zinc-600 text-xs mt-8 pt-8 border-t border-zinc-900">
        &copy; {new Date().getFullYear()} FUT Prime. Todos os direitos reservados. Não somos afiliados à EA Sports.
      </div>
    </footer>
  );
}
