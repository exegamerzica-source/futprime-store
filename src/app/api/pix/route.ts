import { NextResponse } from 'next/server';
import { Pix } from 'faz-um-pix';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { amount, transactionId } = await req.json();

    let pixKey = '+5511992013539';
    let pixName = 'Vastomix ltda';
    let pixCity = 'SAO PAULO';

    try {
      const { data } = await supabase.from('store_settings').select('*').eq('id', 'default').single();
      if (data && data.pix_key) {
        pixKey = data.pix_key;
        pixName = data.pix_name || pixName;
        pixCity = data.pix_city || pixCity;
      }
    } catch (e) {
      // Ignore if table doesn't exist
    }

    const pixPayload = await Pix(
      pixKey, 
      pixName,
      pixCity,
      parseFloat(amount),
      transactionId || 'FUTPRIME'
    );

    return NextResponse.json({ payload: pixPayload });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
