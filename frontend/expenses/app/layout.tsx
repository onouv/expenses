import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import theme from './theme.ts';
import { ThemeProvider } from '@mui/material/styles';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expenses",
  description: "A web app to track expenses for small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme ={theme}>
              {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}



