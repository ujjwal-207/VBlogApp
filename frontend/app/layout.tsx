import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <ThemeProvider>
        <Navbar />
        <div className="min-h-screen outline outline-red-500 ">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

