import { Mona_Sans } from "next/font/google"
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona",
})


export const metadata = {
  title: "MyGrono",
  description: "Create powerful YouTube campaigns, choose the right plan, and track real performance metrics — all in one dashboard.",
  icons: {
    icon: "../../public/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        
      </head>
      <body
        className={`${monaSans.variable} antialiased scroll-smooth`}
      >
        <main>{children}</main>
         <Toaster />
      </body>
     
    </html>
  );
}
