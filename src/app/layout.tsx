import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { FavoritesProvider } from "@/features/favorites/favorites-provider";

export const metadata: Metadata = {
  title: "Delifast — Le meilleur de vos envies, au même endroit",
  description:
    "Découvrez les restaurants, les plats et les commerces de Ouagadougou avec Delifast.",
  applicationName: "Delifast",
};

export const viewport: Viewport = {
  themeColor: "#f0442f",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
