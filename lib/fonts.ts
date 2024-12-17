import localFont from 'next/font/local';

export const gotham = localFont({
  src: [
    {
      path: './fonts/Gotham-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Gotham-Medium.woff2',
      weight: '500', 
      style: 'normal',
    },
    {
      path: './fonts/Gotham-Bold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-gotham'
});