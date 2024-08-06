import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://inkryqrjlvcrdegmzhwi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlua3J5cXJqbHZjcmRlZ216aHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2OTM2MDMsImV4cCI6MjAzMTI2OTYwM30.yRNvV1M8deeQbJf1dZXBlLSla22G0TC7c6gux8qCVlw",
);
