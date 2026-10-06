import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { profile } from "@/constants/portfolio";
const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title =
  "Mohamed Samhi | Software Engineer & Computer Engineering Undergraduate";
const description =
  "Portfolio of Mohamed Samhi, a Computer Engineering undergraduate and full-stack developer building applications with Java, Spring Boot, React, Next.js, machine learning and DevOps technologies.";
const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
});
const space = localFont({
  src: "../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-heading",
  display: "swap",
});
const mono = localFont({
  src: "../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-code",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: { title, description, type: "website", locale: "en_US", url },
  twitter: { card: "summary", title, description },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.name,
    url,
    email: profile.email,
    sameAs: [profile.github, profile.linkedin],
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "University of Ruhuna",
    },
  };
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
