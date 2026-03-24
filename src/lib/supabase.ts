import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = envUrl && envUrl !== 'YOUR_API_KEY' ? envUrl : 'https://placeholder.supabase.co';
const supabaseAnonKey = envKey && envKey !== 'YOUR_API_KEY' ? envKey : 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
