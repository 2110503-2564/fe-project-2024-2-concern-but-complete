import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export const metadata: Metadata = {
  title: "CBC hotel booking",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`bg-bg font-poppins text-text`}>
        <NextAuthProvider session={session}>
          <NavBar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
