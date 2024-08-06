const config = {
  baseUrl: import.meta.env.VITE_API_URL || '',
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON || '',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  maxSizeUploadAvatar: 1048576 // bytes
}

export default config
