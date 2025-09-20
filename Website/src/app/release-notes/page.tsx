import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Calendar, CheckCircle, Download, Github, Settings, Shield, Star, Zap} from "lucide-react"
import {Navbar} from "@/components/Navbar";
import {Footer} from "@/components/Footer";
import Link from "next/link";

export default function ReleaseNotesPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar/>
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent border-accent/20">
                            <Calendar className="w-3 h-3 mr-1"/>
                            Latest Release
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">Release Notes</h1>
                        <p className="text-xl text-muted-foreground text-pretty">
                            Stay updated with the latest features, improvements, and bug fixes in Converti.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <Card className="border-2 border-accent/20 bg-accent/5">
                        <CardHeader className="pb-6">
                            <div className="flex items-center justify-between mb-4">
                                <Badge className="bg-accent text-accent-foreground">
                                    <Star className="w-3 h-3 mr-1"/>
                                    Latest Release
                                </Badge>
                                <span className="text-sm text-muted-foreground">December 15, 2067</span>
                            </div>
                            <CardTitle className="text-3xl">Version 1.0.0 - Initial Release</CardTitle>
                            <CardDescription className="text-lg">
                                The first release of Converti 🥳 . Brings comprehensive file conversion capabilities
                                and archiving capabilities
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
                                    <Zap className="w-5 h-5 mr-2 text-accent"/>
                                    New Features
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <strong>Multi-format Support:</strong> Convert between 60+ file formats
                                            across images (JPG, PNG,
                                            GIF, WebP, TIFF, BMP, SVG, HEIC), videos (MP4, AVI, MOV, MKV, WebM, FLV,
                                            WMV), audio (MP3, WAV,
                                            FLAC, AAC, OGG, M4A, WMA), and documents (PDF, DOCX, TXT, RTF, ODT, HTML,
                                            MD).
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <strong>Archive Specialist:</strong> Create ZIP, RAR, 7Z, and GZ
                                            archives with customizable compression settings.
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <strong>Batch Processing:</strong> Convert hundreds of files simultaneously
                                            with queue management
                                            and progress tracking.
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <strong>Advanced Customization:</strong> Fine-tune quality, resolution,
                                            compression, color
                                            profiles, and format-specific parameters.
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <strong>Preset System:</strong> Save and reuse custom conversion settings
                                            for consistent results.
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
                                    <Shield className="w-5 h-5 mr-2 text-accent"/>
                                    Privacy & Security
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <strong>100% Local Processing:</strong> All conversions happen on your
                                            device. No cloud uploads,
                                            no data transmission.
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <strong>Zero Data Collection:</strong> No analytics, telemetry, or personal
                                            data tracking.
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <strong>Offline Operation:</strong> Works completely offline after
                                            installation. No internet
                                            required.
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <strong>Open Source:</strong> Transparent, auditable code available on
                                            GitHub.
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
                                    <Settings className="w-5 h-5 mr-2 text-accent"/>
                                    Technical Foundation
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <strong>FFmpeg Integration:</strong> Industry-standard multimedia processing
                                            for video and audio
                                            conversions.
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <strong>7-Zip Engine:</strong> Powerful archive handling with excellent
                                            compression ratios.
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <strong>Pandoc Integration:</strong> Universal document conversion with
                                            formatting preservation.
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <strong>wkhtmltopdf Support:</strong> High-quality HTML to PDF conversion
                                            with full CSS support.
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <strong>Cross-Platform:</strong> Native support for Windows, macOS, and
                                            Linux.
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-6 border-t">
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <Link href="/download">
                                        <Button size="lg"
                                                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8">
                                            <Download className="w-5 h-5 mr-2"/>
                                            Download v1.0.0
                                        </Button>
                                    </Link>
                                    <Button size="lg" variant="outline" className="px-8 bg-transparent" asChild>
                                        <a
                                            href="https://github.com/YassineKh2/Converti"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Github className="w-5 h-5 mr-2"/>
                                            View on GitHub
                                        </a>
                                    </Button>
                                </div>
                                <p className="text-center text-sm text-muted-foreground mt-4">
                                    Available for Windows, macOS, and Linux • 45MB download • No registration required
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="py-16 px-4 bg-muted/30">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-4">What's Next?</h2>
                        <p className="text-muted-foreground">
                            We're continuously working to improve Converti while maintaining our privacy-first approach.
                        </p>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Features</CardTitle>
                            <CardDescription>Planned improvements for future releases based on community
                                feedback</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                                    Archive files after conversion is finished
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                                    Support for simultaneous multi conversion of the same file
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                                    Realtime(ish) progress bar
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                                    Implementation of electron workers for faster conversions
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                                    Other interesting features
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Footer/>
        </div>
    )
}
