import Link from "next/link";
import {Archive, Github} from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t bg-muted/30 py-12 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                                <Image src="/Logo.png" width={15} height={15} alt="logo"/>
                            </div>
                            <span className="text-xl font-bold text-primary">Converti</span>
                        </Link>
                        <p className="text-muted-foreground text-sm mb-4">
                            Privacy-first file conversion that works entirely on your device.
                        </p>
                        <Link
                            href="https://github.com/YassineKh2/Converti"
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
                            aria-label="View on GitHub"
                        >
                            <Github className="w-5 h-5 mr-2"/>
                            View on GitHub
                        </Link>
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary mb-4">Product</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/features" className="hover:text-primary transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/#formats" className="hover:text-primary transition-colors">
                                    Supported Formats
                                </Link>
                            </li>
                            <li>
                                <Link href="/download/#requirements" className="hover:text-primary transition-colors">
                                    System Requirements
                                </Link>
                            </li>
                            <li>
                                <Link href="/release-notes" className="hover:text-primary transition-colors">
                                    Release Notes
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link target="_blank" rel="noopener noreferrer" href="https://github.com/YassineKh2/Converti" className="hover:text-primary transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary mb-4">About</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    Converti
                                </Link>
                            </li>
                            <li>
                                <Link target="_blank" rel="noopener noreferrer" href="https://github.com/YassineKh2/Converti" className="hover:text-primary transition-colors">
                                    Open Source Licenses
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; 2025 Converti, Built with privacy in mind.</p>
                </div>
            </div>
        </footer>

    )
}