import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-300">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-32 space-y-8">
        <h1 className="text-4xl font-black text-white uppercase tracking-tight">Termos de Uso</h1>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e utilizar a loja FUT Prime, você concorda com estes Termos de Uso. 
            Estes termos se aplicam a todos os visitantes, usuários e outras pessoas que acessam ou usam o Serviço.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. Serviços Oferecidos</h2>
          <p>
            A FUT Prime oferece o serviço de intermediação e facilitação na aquisição de moedas virtuais para o jogo EA FC.
            Não possuímos vínculo, afiliação, patrocínio ou qualquer relação direta com a EA Sports ou a Electronic Arts Inc.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Política de Entrega</h2>
          <p>
            As entregas são realizadas de forma digital (via mercado de transferências do jogo). 
            O tempo médio de entrega é de 10 minutos a 2 horas após a confirmação do pagamento, podendo variar em dias de evento no jogo.
            É obrigatório que o cliente tenha o Web App desbloqueado no caso da entrega Comfort Trade, ou liste os jogadores corretamente no caso de Player Auction.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Política de Reembolso</h2>
          <p>
            O reembolso integral poderá ser solicitado caso a entrega não seja iniciada em até 24 horas úteis.
            Devido à natureza digital do produto, uma vez que as moedas foram entregues na sua conta, não há possibilidade de devolução ou reembolso, caracterizando o serviço como consumido.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Riscos e Segurança</h2>
          <p>
            Utilizamos o método 100% Snipe para máxima segurança. No entanto, qualquer transação de terceiros viola os termos de serviço da EA.
            Embora nossa taxa de banimento seja próxima a 0%, o risco sempre existirá e o comprador assume total responsabilidade sobre sua conta. A FUT Prime não cobre contas banidas após a entrega bem-sucedida.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">6. Contato</h2>
          <p>
            Para qualquer dúvida sobre estes Termos, entre em contato pelo nosso e-mail: suporte@futprime.com.br
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
