import { NextResponse } from 'next/server';
import { Pix } from 'faz-um-pix';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { amount, transactionId } = await req.json();

    // Buscar configs do admin
    const { data } = await supabase.from('store_settings').select('*').eq('id', 'default').single();
    
    if (!data || !data.pix_key) {
      return NextResponse.json({ error: 'Chave PIX não configurada no Admin.' }, { status: 400 });
    }

    const pixPayload = await Pix(
      data.pix_key, 
      data.pix_name || 'FUT PRIME STORE',
      data.pix_city || 'SAO PAULO',
      parseFloat(amount),
      transactionId || 'FUTPRIME'
    );

    return NextResponse.json({ payload: pixPayload });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
