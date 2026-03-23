import type { Metadata } from "next";
import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";

export const metadata: Metadata = {
  title: "TIAGO VILAS portfolio",
  description: "Mechanical Engineering student at UTT and former exchange student at Cégep de Sherbrooke. Discover my biomechanical projects, 3D design portfolio, and academic background.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
