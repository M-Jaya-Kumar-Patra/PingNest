import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "PingNest",
  description: "Developer observability for uptime, incidents, and telemetry.",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "32x32",
      },
      {
        url: "/pingnest-icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}) {
  return (  
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
