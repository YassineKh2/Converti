import {Button} from "@/components/ui/button"
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {Archive, ChevronDown, Code, Download, ExternalLink, Github, Shield} from "lucide-react"
import {Navbar} from "@/components/Navbar";
import {Footer} from "@/components/Footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">

            <Navbar/>

            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent border-accent/20">
                            <Code className="w-3 h-3 mr-1"/>
                            Open Source Project
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">About
                            Converti</h1>
                        <p className="text-xl text-muted-foreground text-pretty">
                            A privacy-first file conversion tool built with transparency, security, and user freedom at
                            its core.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 bg-muted/30">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
                            <p className="text-muted-foreground mb-6">
                                As someone who converts a lot of files, I was constantly frustrated by ads, conversion
                                limits, and the lack of control over my own files.
                                That’s why we created Converti because file conversion should be fast, offline, and
                                entirely in your hands. </p>
                            <p className="text-muted-foreground mb-6">
                                We built Converti to run 100% locally no internet required, no ads, no waiting on slow
                                servers . Just a powerful software that respects your privacy and works anywhere,
                                anytime
                            </p>
                        </div>
                        <div className="bg-background p-8 rounded-lg border">
                            <Shield className="w-12 h-12 text-accent mb-4"/>
                            <h3 className="text-xl font-semibold text-primary mb-4">Privacy First</h3>
                            <p className="text-muted-foreground">
                                Every design decision prioritizes user privacy. Your files never leave your device as
                                everything is processed locally,
                                ensuring complete confidentiality for all your conversion needs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">What Makes Converti Special</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive file conversion capabilities with uncompromising privacy standards
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader>
                                <Archive className="w-10 h-10 text-accent mb-4"/>
                                <CardTitle>Extensive Format Support</CardTitle>
                                <CardDescription>
                                    Convert between hundreds of formats across images, videos, audio, documents, and
                                    archives including
                                    ZIP, RAR, 7Z, TAR, GZ, and BZ2.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Shield className="w-10 h-10 text-accent mb-4"/>
                                <CardTitle>Local Processing</CardTitle>
                                <CardDescription>
                                    All conversions happen on your device. No internet required, no data uploaded
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Code className="w-10 h-10 text-accent mb-4"/>
                                <CardTitle>Open Source</CardTitle>
                                <CardDescription>
                                    Transparent, auditable code that you can inspect, modify, and contribute to. No
                                    hidden functionality.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-muted/30">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">Built on Proven Technology</h2>
                        <p className="text-muted-foreground">
                            Converti leverages industry-standard open-source tools to deliver reliable, high-quality
                            conversions
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <a href="https://www.7-zip.org/" target="_blank"
                                       rel="noopener noreferrer"><ExternalLink
                                        className="w-5 h-5 mr-2 text-accent"/></a>
                                    7-Zip
                                </CardTitle>
                                <CardDescription>
                                    Powers our archive creation and extraction capabilities. Supports ZIP, RAR, 7Z, TAR,
                                    GZ, BZ2, and more
                                    with excellent compression ratios.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <a href="https://ffmpeg.org/" target="_blank"
                                       rel="noopener noreferrer"><ExternalLink
                                        className="w-5 h-5 mr-2 text-accent"/></a>

                                    FFmpeg
                                </CardTitle>
                                <CardDescription>
                                    Handles all video and audio conversions with support for hundreds of codecs and
                                    formats.
                                    Industry-standard multimedia processing.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <a href="https://pandoc.org/" target="_blank"
                                       rel="noopener noreferrer"><ExternalLink
                                        className="w-5 h-5 mr-2 text-accent"/></a>
                                    Pandoc
                                </CardTitle>
                                <CardDescription>
                                    Universal document converter supporting Markdown, HTML, PDF, DOCX, and many other
                                    text formats with
                                    excellent formatting preservation.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <a href="https://wkhtmltopdf.org/" target="_blank"
                                       rel="noopener noreferrer"><ExternalLink
                                        className="w-5 h-5 mr-2 text-accent"/></a>
                                    wkhtmltopdf
                                </CardTitle>
                                <CardDescription>
                                    Enables high-quality HTML to PDF conversion with full CSS support and precise
                                    rendering for
                                    professional document output.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="mt-16 bg-background p-6 rounded-lg border">
                        <Collapsible>
                            <CollapsibleTrigger
                                className="flex items-center justify-between w-full text-left cursor-pointer">
                                <h3 className="text-lg font-semibold text-primary">Additional Libraries Used</h3>
                                <ChevronDown className="w-4 h-4 text-muted-foreground"/>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-4">
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center py-2 border-b border-muted">
                                        <a href="http://potrace.sourceforge.net/" target="_blank"
                                           rel="noopener noreferrer"
                                           className="font-medium text-primary hover:underline">
                                            Potrace
                                        </a>
                                        <span className="text-muted-foreground">Bitmap to vector tracing</span>
                                    </div>

                                    <div className="flex justify-between items-center py-2 border-b border-muted">
                                        <a href="https://sharp.pixelplumbing.com/" target="_blank"
                                           rel="noopener noreferrer"
                                           className="font-medium text-primary hover:underline">
                                            Sharp
                                        </a>
                                        <span className="text-muted-foreground">High-performance image processing</span>
                                    </div>

                                    <div className="flex justify-between items-center py-2 border-b border-muted">
                                        <a href="https://www.npmjs.com/package/jimp" target="_blank"
                                           rel="noopener noreferrer"
                                           className="font-medium text-primary hover:underline">
                                            JIMP
                                        </a>
                                        <span className="text-muted-foreground">JavaScript image manipulation</span>
                                    </div>

                                    <div className="flex justify-between items-center py-2 border-b border-muted">
                                        <a href="https://www.npmjs.com/package/unzipper" target="_blank"
                                           rel="noopener noreferrer"
                                           className="font-medium text-primary hover:underline">
                                            Unzipper
                                        </a>
                                        <span className="text-muted-foreground">Archive extraction utilities</span>
                                    </div>

                                    <div className="flex justify-between items-center py-2 border-b border-muted">
                                        <a href="https://www.npmjs.com/package/node-unrar-js" target="_blank"
                                           rel="noopener noreferrer"
                                           className="font-medium text-primary hover:underline">
                                            Node Unrar
                                        </a>
                                        <span className="text-muted-foreground">Archive extraction utilities</span>
                                    </div>

                                    <div className="flex justify-between items-center py-2 border-b border-muted">
                                        <a href="https://www.npmjs.com/package/fluent-ffmpeg" target="_blank"
                                           rel="noopener noreferrer"
                                           className="font-medium text-primary hover:underline">
                                            Fluent-FFmpeg
                                        </a>
                                        <span className="text-muted-foreground">FFmpeg wrapper for Node.js</span>
                                    </div>

                                    <div className="flex justify-between items-center py-2 border-b border-muted">
                                        <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer"
                                           className="font-medium text-primary hover:underline">
                                            Tailwind CSS
                                        </a>
                                        <span className="text-muted-foreground">Utility-first CSS framework</span>
                                    </div>

                                    <div className="flex justify-between items-center py-2">
                                        <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer"
                                           className="font-medium text-primary hover:underline">
                                            Shadcn/ui
                                        </a>
                                        <span className="text-muted-foreground">React component library</span>
                                    </div>

                                    <div className="flex justify-between items-center py-2">
                                        <a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer"
                                           className="font-medium text-primary hover:underline">
                                            Lucide
                                        </a>
                                        <span className="text-muted-foreground">Icon library</span>
                                    </div>

                                    <div className="flex justify-between items-center py-2">
                                        <a href="https://www.electronjs.org/" target="_blank" rel="noopener noreferrer"
                                           className="font-medium text-primary hover:underline">
                                            Electron
                                        </a>
                                        <span
                                            className="text-muted-foreground">Cross-platform desktop app framework</span>
                                    </div>

                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-muted-foreground">
                            We're grateful to the open-source community for these incredible tools that make Converti
                            possible. By
                            building on proven, trusted software, we ensure reliability and security for all users.
                        </p>
                    </div>
                </div>
            </section>


            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <Github className="w-16 h-16 text-accent mx-auto mb-6"/>
                    <h2 className="text-3xl font-bold text-primary mb-6">Open Source & Transparent</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Converti is completely open source. Inspect our code, contribute improvements, or fork the
                        project to create
                        your own version. Transparency builds trust.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button size="lg" variant="outline" className="px-8 bg-transparent" asChild>
                            <a href="https://github.com/YassineKh2/Converti" target="_blank"
                               rel="noopener noreferrer">
                                <Github className="w-5 h-5 mr-2"/>
                                View Source Code
                            </a>
                        </Button>
                        <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8">
                            <Download className="w-5 h-5 mr-2"/>
                            Download Converti
                        </Button>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
}
