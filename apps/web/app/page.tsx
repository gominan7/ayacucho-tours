import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default async function Home() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("sb-session")?.value;
  let user = null;

  if (sessionCookie) {
    try {
      const sessionData = JSON.parse(decodeURIComponent(sessionCookie));
      const accessToken = sessionData?.access_token;
      if (accessToken) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false },
        });
        const { data, error } = await supabase.auth.getUser(accessToken);
        if (!error && data?.user) {
          user = data.user;
        }
      }
    } catch (e) {
      console.error("Error verifying session in root page:", e);
    }
  }

  if (user) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
