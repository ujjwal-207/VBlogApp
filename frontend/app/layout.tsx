import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        <div className="container mx-auto py-10">{children}</div>
      </body>
    </html>
  );
}

