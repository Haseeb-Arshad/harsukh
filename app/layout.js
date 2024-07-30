
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/state/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Harsukh Residences",
  description: "Harsukh Residences - Powered by AlMAYMAAR",
};

export default function RootLayout({ children }) {
  return (
  <Providers >
      <html lang="en">
        
        <body className={inter.className}>

          {children}
          </body>
      </html>
  </Providers>

  );
}
