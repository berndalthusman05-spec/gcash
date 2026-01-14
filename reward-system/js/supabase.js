
// Initialize Supabase Client
const SUPABASE_URL = 'https://dsrfkojqenvakcjenlgv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzcmZrb2pxZW52YWtjamVubGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMjY4NDMsImV4cCI6MjA4MzkwMjg0M30.ok1B4XEtudS6CqMxngQT8kNs4Z4FFPF8WvePezfWJH0';

// Check if Supabase script is loaded
if (typeof supabase === 'undefined') {
    console.error('Supabase SDK not loaded. Make sure to include the CDN link in your HTML.');
}

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other files
window.supabaseClient = _supabase;
