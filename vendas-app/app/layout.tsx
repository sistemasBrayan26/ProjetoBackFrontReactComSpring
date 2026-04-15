// app/layout.tsx
// REMOVA o "use client" daqui!
import "./globals.css"; // Apenas este import de CSS!
import { PrimeReactProvider } from "primereact/api";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <PrimeReactProvider>
          {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}