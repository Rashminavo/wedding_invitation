import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wedding-invitation.vercel.app"),
  title: "Dhananjaya & Tharanya | Wedding Invitation",
  description:
    "A premium digital wedding invitation for Dhananjaya and Tharanya with ceremony details, venue, countdown, and RSVP.",
  keywords: ["wedding invitation", "Dhananjaya", "Tharanya", "Sri Lanka wedding"],
  openGraph: {
    title: "Dhananjaya & Tharanya",
    description: "Join us as we celebrate our wedding day.",
    type: "website",
    images: ["/invitation-card.jpg"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@500;600;700&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
