// app/layout.tsx
import "./globals.css";
import { PrimeReactProvider } from "primereact/api";
import { Providers } from "./providers"; // Importe o arquivo que criamos com o SessionProvider

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        {/* Envolvemos tudo com o SessionProvider (através do componente Providers) */}
        <Providers>
          {/* Mantemos o seu PrimeReactProvider aqui dentro também */}
          <PrimeReactProvider>
            {children}
          </PrimeReactProvider>
        </Providers>
      </body>
    </html>
  );
}