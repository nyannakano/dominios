import "./globals.css";
import Header from "@/app/components/Header";
import { AuthProvider } from '@/contexts/AuthContext';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
      <AuthProvider>
          <Header />
          {children}
      </AuthProvider>
      </body>
    </html>
  );
}
