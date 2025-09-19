"use client"

import {useEffect, useRef, useState} from "react"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {
    Archive,
    ArrowRight,
    BarChart3,
    Download,
    FileAudio,
    FileImage,
    FileVideo,
    FolderOpen,
    MousePointer2,
    Palette,
    Settings,
    Shield,
    Sliders,
} from "lucide-react"
import Link from "next/link"
import {Footer} from "@/components/Footer";
import {Navbar} from "@/components/Navbar";

export default function FeaturesPage() {
    const observerRef = useRef<IntersectionObserver | null>(null)
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.getAttribute("data-section") || ""
                        setVisibleSections((prev) => new Set([...prev, sectionId]))
                    }
                })
            },
            {threshold: 0.1, rootMargin: "0px 0px -100px 0px"},
        )

        const elements = document.querySelectorAll(".scroll-reveal")
        elements.forEach((el) => observerRef.current?.observe(el))

        return () => observerRef.current?.disconnect()
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <Navbar/>

            <section className="py-20 px-4">
                <div className="container mx-auto text-center max-w-4xl">
                    <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent border-accent/20">
                        <Shield className="w-3 h-3 mr-1"/>
                        Explore All Features
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 text-balance">
                        Powerful Features for
                        <span className="text-accent"> Every Conversion Need</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
                        Discover how Converti's comprehensive feature set makes file conversion simple, secure, and
                        completely
                        private.
                    </p>
                </div>
            </section>

            <section
                className={`py-20 px-4 scroll-reveal transition-all duration-700 ease-out ${
                    visibleSections.has("drag-drop") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                data-section="drag-drop"
            >
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center mb-4">
                                <MousePointer2 className="w-8 h-8 text-accent mr-3"/>
                                <Badge variant="outline">Intuitive Interface</Badge>
                            </div>
                            <h2 className="text-3xl font-bold text-primary mb-6">Effortless Drag & Drop</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Simply drag your files into Converti and watch the magic happen. No complex menus or
                                confusing workflows
                                - just drop your files and start converting immediately.
                            </p>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center">
                                    <ArrowRight className="w-4 h-4 text-accent mr-2"/>
                                    Support for multiple files at once
                                </li>
                                <li className="flex items-center">
                                    <ArrowRight className="w-4 h-4 text-accent mr-2"/>
                                    Automatic format detection
                                </li>
                                <li className="flex items-center">
                                    <ArrowRight className="w-4 h-4 text-accent mr-2"/>
                                    Visual feedback during upload
                                </li>
                            </ul>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                            <img
                                src="/features/drag%20and%20drop.gif"
                                alt="Drag and drop interface demonstration"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section
                className={`py-20 px-4 bg-muted/30 scroll-reveal transition-all duration-700 ease-out ${
                    visibleSections.has("format-selection") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                data-section="format-selection"
            >
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div
                            className="order-2 lg:order-1 bg-background rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                            <img
                                src="/features/select%20format.gif"
                                alt="Format selection interface"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="flex items-center mb-4">
                                <Settings className="w-8 h-8 text-accent mr-3"/>
                                <Badge variant="outline">Comprehensive Support</Badge>
                            </div>
                            <h2 className="text-3xl font-bold text-primary mb-6">Choose Your Perfect Format</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                With support for over 100 file formats across images, videos, audio, documents, and
                                archives, Converti
                                handles any conversion challenge you throw at it.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center p-3 bg-background rounded-lg border">
                                    <FileImage className="w-5 h-5 text-accent mr-2"/>
                                    <span className="text-sm font-medium">8+ Image Formats</span>
                                </div>
                                <div className="flex items-center p-3 bg-background rounded-lg border">
                                    <FileVideo className="w-5 h-5 text-accent mr-2"/>
                                    <span className="text-sm font-medium">6+ Video Formats</span>
                                </div>
                                <div className="flex items-center p-3 bg-background rounded-lg border">
                                    <FileAudio className="w-5 h-5 text-accent mr-2"/>
                                    <span className="text-sm font-medium">6+ Audio Formats</span>
                                </div>
                                <div className="flex items-center p-3 bg-background rounded-lg border">
                                    <Archive className="w-5 h-5 text-accent mr-2"/>
                                    <span className="text-sm font-medium">6+ Archive Formats</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className={`py-20 px-4 scroll-reveal transition-all duration-700 ease-out ${
                    visibleSections.has("customization") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                data-section="customization"
            >
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center mb-4">
                                <Sliders className="w-8 h-8 text-accent mr-3"/>
                                <Badge variant="outline">Advanced Control</Badge>
                            </div>
                            <h2 className="text-3xl font-bold text-primary mb-6">Extensive Customization Options</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Fine-tune every aspect of your conversions with professional-grade settings. From save
                                locations and naming conventions to notifications and progress details, you have
                                complete control.
                            </p>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center">
                                    <Palette className="w-4 h-4 text-accent mr-2"/>
                                    Flexible Naming Options
                                </li>
                                <li className="flex items-center">
                                    <Palette className="w-4 h-4 text-accent mr-2"/>
                                    Personalized Save Locations
                                </li>
                                <li className="flex items-center">
                                    <Palette className="w-4 h-4 text-accent mr-2"/>
                                    Full Control Over Notifications and Alerts
                                </li>
                            </ul>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                            <img
                                src="/features/settings.gif"
                                alt="Customization settings interface"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section
                className={`py-20 px-4 bg-muted/30 scroll-reveal transition-all duration-700 ease-out ${
                    visibleSections.has("progress-tracking") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                data-section="progress-tracking"
            >
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div
                            className="order-2 lg:order-1 bg-background rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                            <img
                                src="/features/progressbar.gif"
                                alt="Progress tracking interface"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="flex items-center mb-4">
                                <BarChart3 className="w-8 h-8 text-accent mr-3"/>
                                <Badge variant="outline">Real-time Updates</Badge>
                            </div>
                            <h2 className="text-3xl font-bold text-primary mb-6">Track Your Conversions</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Stay informed with real-time progress tracking. See exactly how your conversions are
                                progressing with
                                detailed status updates and estimated completion times.
                            </p>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center">
                                    <ArrowRight className="w-4 h-4 text-accent mr-2"/>
                                    Individual file progress indicators
                                </li>
                                <li className="flex items-center">
                                    <ArrowRight className="w-4 h-4 text-accent mr-2"/>
                                    Batch conversion overview
                                </li>
                                <li className="flex items-center">
                                    <ArrowRight className="w-4 h-4 text-accent mr-2"/>
                                    Full conversion logging
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className={`py-20 px-4 scroll-reveal transition-all duration-700 ease-out ${
                    visibleSections.has("archive-management") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                data-section="archive-management"
            >
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center mb-4">
                                <FolderOpen className="w-8 h-8 text-accent mr-3"/>
                                <Badge variant="outline">Archive Specialist</Badge>
                            </div>
                            <h2 className="text-3xl font-bold text-primary mb-6">Advanced Archive Handling</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Converti excels at archive management with support for creating, extracting, and
                                converting between
                                multiple archive formats including ZIP, RAR, 7Z, TAR, GZ, and BZ2.
                            </p>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                                    <Archive className="w-5 h-5 text-accent mr-3"/>
                                    <div>
                                        <div className="font-medium text-sm">Create Archives</div>
                                        <div className="text-xs text-muted-foreground">Compress files into various
                                            formats
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                                    <Archive className="w-5 h-5 text-accent mr-3"/>
                                    <div>
                                        <div className="font-medium text-sm">Convert Between Formats</div>
                                        <div className="text-xs text-muted-foreground">Transform ZIP to 7Z, RAR to TAR,
                                            and more
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                                    <Archive className="w-5 h-5 text-accent mr-3"/>
                                    <div>
                                        <div className="font-medium text-sm">Archive Conversions</div>
                                        <div className="text-xs text-muted-foreground">Automatically archive all converted files upon completion ( Coming soon )
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                            <img
                                src="/features/archive.gif"
                                alt="Archive management interface"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="container mx-auto text-center max-w-3xl">
                    <h2 className="text-3xl font-bold text-primary mb-6">Experience All Features Today</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Download Converti now and discover how powerful, private file conversion should work.
                    </p>
                    <Link href="/download">
                        <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8">
                            <Download className="w-5 h-5 mr-2"/>
                            Download Converti
                        </Button>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-4">
                        ✓ All Features Included • ✓ No Registration Required • ✓ Always Free
                    </p>
                </div>
            </section>


            <Footer/>
        </div>
    )
}
