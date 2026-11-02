import type { Metadata } from "next";
import AuthClient from "@/components/auth/auth-client";

export const metadata: Metadata = { title: "Inscription — Delifast" };
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function SignupPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const profile = Array.isArray(params.profil) ? params.profil[0] ?? "" : params.profil ?? "";
  return <AuthClient mode="inscription" initialProfile={profile} />;
}
