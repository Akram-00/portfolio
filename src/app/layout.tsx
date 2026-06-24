import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ali Akram — Full Stack Developer",
  description: "Full Stack Developer specializing in React.js, Next.js, Node.js, and scalable web applications.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "Ali Akram"],
  authors: [{ name: "Ali Akram" }],
  openGraph: {
    title: "Ali Akram — Full Stack Developer",
    description: "Building premium digital experiences with modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
