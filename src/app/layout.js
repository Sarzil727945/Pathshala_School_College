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
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-..."
          crossOrigin="anonymous"
        />
        <Script
          src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-..."
          crossOrigin="anonymous"
        />
        <Script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
          integrity="sha384-..."
          crossOrigin="anonymous"
        />
      </head>

      <body className={inter.className}>

        {children}
      </body>
    </html>
  )
}
