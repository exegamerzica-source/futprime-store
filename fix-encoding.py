import os
import re

def fix_gustacoins():
    path = r'src\app\checkout\page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove QrCode fake image
    content = re.sub(r'<QrCode className="w-48 h-48 text-black" />', '{realPixCode ? <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(realPixCode)}`} alt="QR Code PIX" className="w-full max-w-[200px] aspect-square object-contain" /> : <QrCode className="w-48 h-48 text-black" />}', content, flags=re.DOTALL)
    
    # Remove shield background in QR code
    content = re.sub(r'<div className="absolute inset-0 flex items-center justify-center opacity-10">\s*<ShieldCheck className="w-32 h-32 text-black" />\s*</div>', '', content, flags=re.DOTALL)

    # Replace specific bad texts
    content = re.sub(r'<strong[^>]*>Cart[^<]*o de Cr[^<]*dito</strong>', '<strong className="block text-white font-black uppercase tracking-wide">Cartão de Crédito</strong>', content, flags=re.DOTALL)
    content = re.sub(r'<span[^>]*>Aprova[^<]*o imediata \(Processado via PayFlow\)</span>', '<span className="text-zinc-400 text-sm">Aprovação imediata (Processado via PayFlow)</span>', content, flags=re.DOTALL)
    
    content = re.sub(r'<strong[^>]*>PIX Copia e Cola</strong>', '<strong className="block text-white font-black uppercase tracking-wide">PIX Copia e Cola</strong>', content, flags=re.DOTALL)
    content = re.sub(r'<span[^>]*>Aprova[^<]*o em at[^<]* 10 segundos</span>', '<span className="text-zinc-400 text-sm">Aprovação em até 10 segundos</span>', content, flags=re.DOTALL)

    content = re.sub(r'Se voc[^<]* j[^<]* preencheu os dados do cart[^<]*o e finalizou na janela segura, clique abaixo para agendar a entrega das coins:', 'Se você já preencheu os dados do cartão e finalizou na janela segura, clique abaixo para agendar a entrega das coins:', content, flags=re.DOTALL)
    content = re.sub(r'J[^<]* paguei! Receber Moedas', 'Já paguei! Receber Moedas', content, flags=re.DOTALL)

    content = re.sub(r'Pagamento conclu[^<]*do\?', 'Pagamento concluído?', content, flags=re.DOTALL)
    content = re.sub(r'Gerar C[^<]*digo PIX', 'Gerar Código PIX', content, flags=re.DOTALL)
    content = re.sub(r'<span>Gr[^<]*tis</span>', '<span>Grátis</span>', content, flags=re.DOTALL)
    
    content = re.sub(r'Resumo\s+do Pedido', 'Resumo do Pedido', content, flags=re.DOTALL)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_gustacoins()
