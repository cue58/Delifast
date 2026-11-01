export type SupabasePublicEnvironment = Readonly<{
  url: string;
  publishableKey: string;
}>;

export function validateSupabasePublicEnvironment(values: {
  url?: string;
  publishableKey?: string;
}): SupabasePublicEnvironment {
  const url = values.url?.trim();
  const publishableKey = values.publishableKey?.trim();

  if (!url) {
    throw new Error("La variable NEXT_PUBLIC_SUPABASE_URL est requise pour connecter Supabase.");
  }

  if (!publishableKey) {
    throw new Error("La variable NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY est requise pour connecter Supabase.");
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL doit être une URL valide.");
  }

  const isLocalHttp = parsedUrl.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(parsedUrl.hostname);
  if (parsedUrl.protocol !== "https:" && !isLocalHttp) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL doit utiliser HTTPS (HTTP est autorisé pour localhost uniquement).");
  }

  if (parsedUrl.username || parsedUrl.password || parsedUrl.search || parsedUrl.hash) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL ne doit pas contenir d’identifiants, de paramètres ni de fragment.");
  }

  return {
    url: parsedUrl.origin,
    publishableKey,
  };
}

export function getSupabasePublicEnvironment(): SupabasePublicEnvironment {
  return validateSupabasePublicEnvironment({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  });
}
