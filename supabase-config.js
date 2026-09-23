// ==========================================
// CUTIE MEDIA - SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL = https:"//itoqtpdhpsvjxczxnvbz.supabase.co/rest/v1/";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_fqeE7-UBfgKmIkkx7_49Yw_TTFF2QYd";

const cutieSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
