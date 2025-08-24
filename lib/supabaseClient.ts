import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://epjjvvjawvmuttdopijl.supabase.co';
const supabaseAnon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwamp2dmphd3ZtdXR0ZG9waWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMjYzOTgsImV4cCI6MjA3MTYwMjM5OH0.Uk7yNKIdADw3i2uH5s4IOkOOOTmfm_EzBmRhCBimM2k';

export const supabase = createClient(supabaseUrl, supabaseAnon);

