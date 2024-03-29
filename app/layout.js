import './globals.css'
import { inter } from './ui/fonts'

export const metadata = {
  title: 'Turnero',
  description: 'Saca turnos con tus doctores favoritos con Turnero'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
