const fs = require('fs');
let code = fs.readFileSync('src/app/checkout/page.tsx', 'utf8');

const oldBlock = `      const searchParamsObj = new URLSearchParams({
        item: item,
        price: price,
        platform: platform,
        customer_name: formData.nome,
        customer_email: formData.email,
        customer_cpf: formData.cpf,
        customer_whatsapp: formData.whatsapp
      });
      const payflowUrl = \`https://linkmy-pay-vert.vercel.app/pay/dynamic?\${searchParamsObj.toString()}\`;`;

const newBlock = `      const productLabel = \`\${item} - Plataforma: \${platform}\`;
      const searchParamsObj = new URLSearchParams({
        name: productLabel,
        product: productLabel,
        title: productLabel,
        amount: price,
        price: price,
        item: item,
        platform: platform,
        customer_name: formData.nome,
        customer_email: formData.email,
        customer_cpf: formData.cpf,
        customer_whatsapp: formData.whatsapp
      });
      const payflowUrl = \`https://linkmy-pay-vert.vercel.app/pay/dynamic?\${searchParamsObj.toString()}\`;`;

if (code.includes('customer_whatsapp: formData.whatsapp')) {
  code = code.replace(oldBlock, newBlock);
  console.log('Replaced!');
} else {
  console.log('Block not found!');
}

fs.writeFileSync('src/app/checkout/page.tsx', code, 'utf8');
