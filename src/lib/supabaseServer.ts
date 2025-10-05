import { createClient } from '@supabase/supabase-js';

export function supabaseServerFromAuthHeader(authHeader?: string | null) {
  const accessToken = authHeader?.startsWith('Bearer ')
    ? authHeader.substring('Bearer '.length).trim()
    : undefined;

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    accessToken
      ? { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
      : undefined
  );
}
