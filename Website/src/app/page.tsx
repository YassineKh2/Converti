import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {
    Archive,
    CheckCircle,
    Download,
    FileAudio,
    FileImage,
    FileText,
    FileVideo,
    Lock,
    Palette,
    Settings,
    Shield,
    Zap,
} from "lucide-react"
import Link from "next/link"
import {Navbar} from "@/components/Navbar";
import {Footer} from "@/components/Footer";

export default function ConvertiLandingPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar/>
            <section className="py-20 px-4">
                <div className="container mx-auto text-center max-w-4xl">
                    <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent border-accent/20">
                        <Shield className="w-3 h-3 mr-1"/>
                        100% Local Processing
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 text-balance">
                        Convert Files Locally,
                        <span className="text-accent"> Keep Your Privacy</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
                        Transform any file format with complete privacy. No cloud uploads, no data collection, no
                        subscriptions and no ads.
                        Just powerful, customizable file conversion that works entirely on your machine.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/download">
                            <Button size="lg"
                                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8">
                                <Download className="w-5 h-5 mr-2"/>
                                Download Converti
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="outline" size="lg" className="px-8 bg-transparent">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                        ✓ Windows and Mac • ✓ No Registration Required • ✓ Always Free
                    </p>
                </div>
            </section>

            <section id="formats" className="py-16 px-4 bg-muted/30">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-4">Support for Every File Type</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Convert between hundreds of formats across all major file categories
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        <Card className="text-center">
                            <CardHeader className="pb-3">
                                <FileImage className="w-8 h-8 text-accent mx-auto mb-2"/>
                                <CardTitle className="text-lg">Images</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-3">JPG, PNG, GIF, WebP, TIFF, BMP, SVG,
                                    HEIC</p>
                                <Badge variant="outline" className="text-xs">
                                    10+ formats
                                </Badge>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader className="pb-3">
                                <FileVideo className="w-8 h-8 text-accent mx-auto mb-2"/>
                                <CardTitle className="text-lg">Videos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-3">MP4, AVI, MOV, MKV, WebM, FLV, WMV</p>
                                <Badge variant="outline" className="text-xs">
                                    8+ formats
                                </Badge>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader className="pb-3">
                                <FileAudio className="w-8 h-8 text-accent mx-auto mb-2"/>
                                <CardTitle className="text-lg">Audio</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-3">MP3, WAV, FLAC, AAC, OGG, M4A, WMA</p>
                                <Badge variant="outline" className="text-xs">
                                    8+ formats
                                </Badge>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader className="pb-3">
                                <FileText className="w-8 h-8 text-accent mx-auto mb-2"/>
                                <CardTitle className="text-lg">Documents</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-3">PDF, DOCX, TXT, RTF, ODT, HTML, MD</p>
                                <Badge variant="outline" className="text-xs">
                                    6+ formats
                                </Badge>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardHeader className="pb-3">
                                <Archive className="w-8 h-8 text-accent mx-auto mb-2"/>
                                <CardTitle className="text-lg">Archives</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-3">ZIP, RAR, 7Z, TAR, GZ, BZ2, XZ</p>
                                <Badge variant="outline" className="text-xs">
                                    6+ formats
                                </Badge>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">Why Choose Converti?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Built with privacy and customization at
                            its core</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="border-2 hover:border-accent/50 transition-colors">
                            <CardHeader>
                                <Lock className="w-10 h-10 text-accent mb-4"/>
                                <CardTitle>100% Local Processing</CardTitle>
                                <CardDescription>
                                    Your files never leave your computer. No cloud uploads, no servers, no data
                                    collection.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-2 hover:border-accent/50 transition-colors">
                            <CardHeader>
                                <Zap className="w-10 h-10 text-accent mb-4"/>
                                <CardTitle>Lightning Fast</CardTitle>
                                <CardDescription>
                                    Optimized algorithms ensure rapid conversion without compromising quality.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-2 hover:border-accent/50 transition-colors">
                            <CardHeader>
                                <Palette className="w-10 h-10 text-accent mb-4"/>
                                <CardTitle>Extensive Customization</CardTitle>
                                <CardDescription>
                                    Fine-tune quality, compression, resolution, and dozens of other parameters.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-2 hover:border-accent/50 transition-colors">
                            <CardHeader>
                                <Settings className="w-10 h-10 text-accent mb-4"/>
                                <CardTitle>Batch Processing</CardTitle>
                                <CardDescription>
                                    Convert hundreds of files at once with customizable presets and automation.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-2 hover:border-accent/50 transition-colors">
                            <CardHeader>
                                <CheckCircle className="w-10 h-10 text-accent mb-4"/>
                                <CardTitle>Always Free</CardTitle>
                                <CardDescription>
                                    No subscriptions, no premium tiers, no hidden costs. Full features, forever free.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-2 hover:border-accent/50 transition-colors">
                            <CardHeader>
                                <Archive className="w-10 h-10 text-accent mb-4"/>
                                <CardTitle>Archive Specialist</CardTitle>
                                <CardDescription>
                                    Unique support for creating and extracting ZIP, RAR, 7Z, TAR, GZ, and BZ2 archives.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            <section id="privacy" className="py-20 px-4 bg-muted/30">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto text-center">
                        <Shield className="w-16 h-16 text-accent mx-auto mb-6"/>
                        <h2 className="text-3xl font-bold text-primary mb-6">Your Privacy Matters</h2>
                        <p className="text-xl text-muted-foreground mb-12">
                            In an age of cloud services and data collection, Converti takes a different approach. Your
                            files are
                            processed entirely on your device, ensuring complete privacy and security.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            <div className="bg-background p-6 rounded-lg border">
                                <h3 className="font-semibold text-primary mb-3">No Data Collection</h3>
                                <p className="text-muted-foreground">
                                    We don't track, store, or analyze your usage. No analytics, no telemetry, no
                                    personal data.
                                </p>
                            </div>
                            <div className="bg-background p-6 rounded-lg border">
                                <h3 className="font-semibold text-primary mb-3">Offline Operation</h3>
                                <p className="text-muted-foreground">
                                    Works completely offline. No internet connection required after installation.
                                </p>
                            </div>
                            <div className="bg-background p-6 rounded-lg border">
                                <h3 className="font-semibold text-primary mb-3">Open Source</h3>
                                <p className="text-muted-foreground">
                                    Transparent code that you can audit. No hidden functionality or backdoors.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="faq" className="py-20 px-4 bg-muted/30">
                <div className="container mx-auto max-w-3xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
                    </div>
                    <Accordion type="single" collapsible className="space-y-4">
                        <AccordionItem value="item-1" className="bg-background border rounded-lg px-6">
                            <AccordionTrigger className="text-left">Is Converti really free?</AccordionTrigger>
                            <AccordionContent>
                                Yes, Converti is completely free with no hidden costs, subscriptions, or premium tiers.
                                All features are
                                available to everyone, forever.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6" className="bg-background border rounded-lg px-6">
                            <AccordionTrigger className="text-left">What file types are supported ?</AccordionTrigger>
                            <AccordionContent>
                                Converti supports a wide range of file types, including images (JPG, JPEG, PNG, WEBP,
                                GIF, AVIF, SVG, BMP, TIFF, ICO), videos (MP4, AVI, MOV, WMV, FLV, MKV, WEBM, M4V), audio
                                (MP3, WAV, FLAC, AAC, OGG, M4A, WMA), documents (PDF, DOCX, TXT, RTF, ODT, HTML, EPUB),
                                and archives (ZIP, RAR, 7Z, TAR, GZ, BZ2).
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="bg-background border rounded-lg px-6">
                            <AccordionTrigger className="text-left">How does local processing work?</AccordionTrigger>
                            <AccordionContent>
                                Converti runs entirely on your computer using your device's processing power. Your files
                                are never uploaded to any server or cloud service. It uses popular open-source libraries
                                to ensure seamless conversion. Everything happens locally, ensuring complete privacy and
                                security.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="bg-background border rounded-lg px-6">
                            <AccordionTrigger className="text-left">What archive formats are
                                supported?</AccordionTrigger>
                            <AccordionContent>
                                Converti supports creating and extracting ZIP, RAR, 7Z, and GZ archives.
                                You can also convert between different archive formats
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5" className="bg-background border rounded-lg px-6">
                            <AccordionTrigger className="text-left">Does it work offline?</AccordionTrigger>
                            <AccordionContent>
                                Yes, Converti works completely offline after installation. No internet connection is
                                required for any
                                conversion operations, ensuring your privacy and allowing you to work anywhere.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="container mx-auto text-center max-w-3xl">
                    <h2 className="text-3xl font-bold text-primary mb-6">Ready to Convert with Complete Privacy?</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Join thousands of users who trust Converti for their file conversion needs. Download now and
                        experience the
                        freedom of local processing.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <Link href="/download">
                            <Button size="lg"
                                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8">
                                <Download className="w-5 h-5 mr-2"/>
                                Download Converti
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-accent"/>
                            No Registration Required
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-accent"/>
                            Instant Download
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-accent"/>
                            Always Free
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
}
