import Script from 'next/script'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pathshala School & College',
  description: 'Pathshala School & College',
  icons: {
    icon: ['../../public/favicon.jpg?v=4']
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.jpg" />
      </head>

      <body className={inter.className}>

        {children}
      </body>
    </html>
  )
}
