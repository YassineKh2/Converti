import {Archive, Download, Github} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export function Navbar() {
    return (
        <header
            className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                        <Archive className="w-5 h-5 text-accent-foreground"/>
                    </div>
                    <span className="text-xl font-bold text-primary">Converti</span>
                </div>
                <nav className="hidden md:flex items-center space-x-6">
                    <Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors">
                        Features
                    </Link>
                    <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                        About
                    </Link>
                    <Link href="/release-notes" className="text-muted-foreground hover:text-primary transition-colors">
                        Release Notes
                    </Link>
                    <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                        Contact
                    </Link>
                    <Link href="/#faq" className="text-muted-foreground hover:text-primary transition-colors">
                        FAQ
                    </Link>
                </nav>
                <div className="flex items-center space-x-3">
                    <a
                        href="https://github.com/YassineKh2/Converti"
                        target="_blank" rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View on GitHub"
                    >
                        <Github className="w-5 h-5"/>
                    </a>
                    <Link href="/download">
                        <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                            <Download className="w-4 h-4 mr-2"/>
                            Download
                        </Button>
                    </Link>
                </div>
            </div>
        </header>

    )
}