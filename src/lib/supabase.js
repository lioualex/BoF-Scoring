import { createClient } from '@supabase/supabase-js'

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL     ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

// Use a dummy URL when not configured so createClient doesn't throw
const safeUrl = supabaseUrl.startsWith('http') ? supabaseUrl : 'https://placeholder.supabase.co'
const safeKey = supabaseAnonKey.length > 10 ? supabaseAnonKey : 'placeholder-key'

export const supabase = createClient(safeUrl, safeKey)
