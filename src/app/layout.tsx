import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
 
import { Roboto } from "next/font/google";
import '@/styles/globals.css';
import '@/styles/mui-overrides.css';

const roboto = Roboto({ 
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700']
});

export const metadata = {
  title: "Mathler",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
