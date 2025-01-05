import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieConsentWrapper from "./components/CookieConsentWrapper"; // Import the wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShareKindness",
  description: "An app to promote acts of kindness.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <CookieConsentWrapper>{children}</CookieConsentWrapper>
        </div>
      </body>
    </html>
  );
}
