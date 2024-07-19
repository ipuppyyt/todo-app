import './globals.css';
import { garetbook, garetregular, garetmedium, garetbold, garetheavy } from '@/assets/fonts';

export const metadata = {
  title: 'TaskTracker',
  description: 'A simple To-Do application using Next.js',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className={`${garetbook.variable} ${garetregular.variable} ${garetmedium.variable} ${garetbold.variable} ${garetheavy.variable}`}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;