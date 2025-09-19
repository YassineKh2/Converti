import type React from "react"
import {Suspense} from "react"
import type {Metadata} from "next"
import {GeistSans} from "geist/font/sans"
import {GeistMono} from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
    title: "Converti - Privacy-First File Converter",
    description:
        "Convert files locally with complete privacy. Support for images, videos, audio, documents, and archives. No cloud uploads, completely free.",
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">

        <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        </body>
        </html>
    )
}
