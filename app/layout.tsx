import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Chatia.ai — AI Voice Automation for GHL & VAPI",
  description:
    "Chatia.ai connects GoHighLevel CRM with VAPI voice AI to automate inbound and outbound calls 24/7. Deploy AI agents that book appointments, follow up leads, and sync back to your CRM automatically.",
  keywords: [
    "AI voice automation",
    "GoHighLevel AI",
    "VAPI integration",
    "AI calling software",
    "CRM voice AI",
    "automated phone calls",
    "AI appointment booking",
    "GHL automation",
  ],
  openGraph: {
    title: "Chatia.ai — AI Voice Automation for GHL & VAPI",
    description:
      "Deploy AI voice agents that handle every call, book appointments, and sync to your CRM. Built for agencies and businesses.",
    type: "website",
    siteName: "Chatia.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatia.ai — AI Voice Automation for GHL & VAPI",
    description:
      "Automate every client call with AI. Connect GoHighLevel + VAPI in minutes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0a0a0f]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
