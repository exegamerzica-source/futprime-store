import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nehadpsfzgzubejqzpgb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5laGFkcHNmemd6dWJlanF6cGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMjA0MTUsImV4cCI6MjEwNTc5NjQxNX0.cr7oWjEoe81fBczzOEOTBXW9i_Dl5Xke927sbYE7VNs';

export const supabase = createClient(supabaseUrl, supabaseKey);
