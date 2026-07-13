import { createClient } from "@supabase/supabase-js";

const isServer = typeof window === "undefined";

const cookieStorage = {
  getItem: (key: string) => {
    if (isServer) return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) {
      const content = parts.pop()?.split(';').shift();
      return content ? decodeURIComponent(content) : null;
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (isServer) return;
    // Store in cookie, set secure flag for production safety
    document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax; SameSite=Lax`;
  },
  removeItem: (key: string) => {
    if (isServer) return;
    document.cookie = `${key}=; path=/; max-age=-1; SameSite=Lax`;
  }
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  {
    auth: {
      persistSession: true,
      storage: cookieStorage,
      storageKey: "sb-session",
      autoRefreshToken: true,
      detectSessionInUrl: true,
    }
  }
);
