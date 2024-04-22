import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/userProvider";
import ModalProvider from "@/providers/modalProvider";
import ToasterProvider from "@/providers/toasterProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify - Chirag Yadav",
  description: "A new way to listen to music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar>
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
