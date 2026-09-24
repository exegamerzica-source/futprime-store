import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-black text-zinc-300">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-32 space-y-8">
        <h1 className="text-4xl font-black text-white uppercase tracking-tight">Política de Privacidade</h1>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Informações que Coletamos</h2>
          <p>
            Coletamos informações que você nos fornece diretamente, tais como: nome, endereço de e-mail, número de telefone (WhatsApp) e o seu CPF, para estrita conformidade com a emissão de comprovantes de pagamento e segurança contra fraudes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. Dados de Pagamento</h2>
          <p>
            Os pagamentos na FUT Prime são processados por gateways de pagamento terceirizados e criptografados. Nós NÃO armazenamos os dados do seu cartão de crédito em nossos servidores em nenhuma hipótese.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Como Usamos as Informações</h2>
          <p>
            Utilizamos suas informações para: processar suas transações de compra de moedas, enviar confirmações, fornecer suporte ao cliente via WhatsApp ou E-mail, e detectar/prevenir fraudes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Dados do Jogo (Logins)</h2>
          <p>
            Caso você opte pela entrega Comfort Trade, solicitaremos os dados de login da sua conta EA. 
            Estes dados são utilizados unicamente no momento da entrega das moedas pela nossa equipe e são **imediatamente excluídos** do nosso sistema interno assim que o serviço é concluído.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Compartilhamento de Informações</h2>
          <p>
            Não vendemos, trocamos ou alugamos suas informações pessoais para terceiros. 
            Compartilhamos dados genéricos de pagamento apenas com as instituições bancárias responsáveis por aprovar a sua transação.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">6. Contato</h2>
          <p>
            Em caso de dúvidas sobre nossa Política de Privacidade, solicitação de exclusão ou retificação de dados, contate-nos através do e-mail: suporte@futprime.com.br
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
