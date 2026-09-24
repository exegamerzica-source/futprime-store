const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://postgres.nehadpsfzgzubejqzpgb:GustaCoins%40123@aws-0-sa-east-1.pooler.supabase.com:6543/postgres"
});

async function run() {
  await client.connect();
  console.log("Connected to DB.");

  const sql = `
    CREATE TABLE IF NOT EXISTS public.store_settings (
      id text PRIMARY KEY,
      pix_key text,
      pix_name text,
      pix_city text,
      updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
    );
    INSERT INTO public.store_settings (id, pix_key, pix_name, pix_city) 
    VALUES ('default', '', '', '') ON CONFLICT DO NOTHING;
  `;

  await client.query(sql);
  console.log("Table store_settings created successfully.");
  await client.end();
}

run().catch(console.error);
