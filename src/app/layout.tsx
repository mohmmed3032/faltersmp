import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Falter SMP",
  description:
    "A scripted Minecraft series by a small group of friends. Watch episodes, meet the cast, and join the community.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        {/* Film grain overlay */}
        <div className="film-grain" aria-hidden="true" />
        {/* Global vignette */}
        <div className="vignette" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
