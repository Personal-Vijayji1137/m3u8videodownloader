import "./globals.css";
import { Nunito } from 'next/font/google'
export const openGraphImage = { images: ['https://www.m3u8.iplust.in/Logo.svg'] }
export const metadata = {
  title: "Download m3u8 Video Files with I Plus T Solution | Fast and Secure",
  description: "Download high-quality m3u8 video files securely and fast with I Plus T Solution. Easy-to-use platform for all your video downloading needs.",
  canonical:"https://www.m3u8.iplust.in",
  openGraph: {
    ...openGraphImage,
    url:'https://www.m3u8.iplust.in',
    type: 'website',
    title: 'Download m3u8 Video Files with I Plus T Solution | Fast and Secure',
    siteName:'Download m3u8 Video Files with I Plus T Solution | Fast and Secure',
    description: 'Download high-quality m3u8 video files securely and fast with I Plus T Solution. Easy-to-use platform for all your video downloading needs.',
  },
};
const inter = Nunito({
  subsets: ['latin'],
  display: 'swap',
})
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}