import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://epjjvvjawvmuttdopijl.supabase.co';
const serviceRole = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwamp2dmphd3ZtdXR0ZG9waWpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjAyNjM5OCwiZXhwIjoyMDcxNjAyMzk4fQ.8zJErCNAS-gsYt0mfU3gQOjYwgM9dZGocJCiG6OHo2c';

export const supabaseAdmin = createClient(supabaseUrl, serviceRole);

