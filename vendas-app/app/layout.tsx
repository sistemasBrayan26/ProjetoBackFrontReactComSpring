import "./globals.css";

import '@/app/components/common/loader/loader.css'
import { PrimeReactProvider } from "primereact/api";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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