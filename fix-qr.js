const fs = require('fs');
let code = fs.readFileSync('src/app/checkout/page.tsx', 'utf8');

code = code.replace(/\{realPixCode \? <img[\s\S]*?<\/div>/, '{realPixCode ? <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(realPixCode)}`} alt="QR Code PIX" className="w-full max-w-[200px] aspect-square object-contain mx-auto" /> : <QrCode className="w-48 h-48 text-black" />}\n                        </div>');

fs.writeFileSync('src/app/checkout/page.tsx', code, 'utf8');
