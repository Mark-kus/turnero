import "@/app/globals.css";
import { inter } from "@/app/ui/fonts";

export const metadata = {
  title: "Turnero",
  description: "Saca turnos con tus doctores preferidos con Turnero",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
