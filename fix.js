const fs = require('fs');

const path = 'src/app/checkout/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace using generic regex without hardcoding the corrupt chars
content = content.replace(/<strong[^>]*>Cart[^<]*de[^<]*Cr[^<]*dito<\/strong>/g, '<strong className="block text-white font-black uppercase tracking-wide">Cartão de Crédito</strong>');
content = content.replace(/<span[^>]*>Aprova[^<]*imediata \(Processado via PayFlow\)<\/span>/g, '<span className="text-zinc-400 text-sm">Aprovação imediata (Processado via PayFlow)</span>');
content = content.replace(/Se voc[^<]* preencheu os dados do cart[^<]* e finalizou na janela segura, clique abaixo para agendar a entrega das coins:/g, 'Se você já preencheu os dados do cartão e finalizou na janela segura, clique abaixo para agendar a entrega das coins:');
content = content.replace(/J[^<]* paguei! Receber Moedas/g, 'Já paguei! Receber Moedas');

content = content.replace(/<strong[^>]*>PIX Copia e Cola<\/strong>/g, '<strong className="block text-white font-black uppercase tracking-wide">PIX Copia e Cola</strong>');
content = content.replace(/<span[^>]*>Aprova[^<]*em at[^<]* 10 segundos<\/span>/g, '<span className="text-zinc-400 text-sm">Aprovação em até 10 segundos</span>');

content = content.replace(/Pagamento conclu[^<]*\?/g, 'Pagamento concluído?');
content = content.replace(/Gerar C[^<]*digo PIX/g, 'Gerar Código PIX');
content = content.replace(/<span>Gr[^<]*tis<\/span>/g, '<span>Grátis</span>');

content = content.replace(/<QrCode className="w-48 h-48 text-black" \/>/g, '{realPixCode ? <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(realPixCode)}`} alt="QR Code PIX" className="w-full max-w-[200px] aspect-square object-contain" /> : <QrCode className="w-48 h-48 text-black" />}');
content = content.replace(/<div className="absolute inset-0 flex items-center justify-center opacity-10">[\s\S]*?<ShieldCheck className="w-32 h-32 text-black" \/>[\s\S]*?<\/div>/g, '');

fs.writeFileSync(path, content, 'utf8');
