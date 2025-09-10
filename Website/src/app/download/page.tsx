"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {CheckCircle, Cpu, Download, Github, HardDrive, MemoryStick, Monitor} from "lucide-react"
import Link from "next/link"
import {Navbar} from "@/components/Navbar";
import {Footer} from "@/components/Footer";

export default function DownloadPage() {
    const [downloadingScreen, setDownloadingScreen] = useState({
        isVisible: false,
        fileName: "",
        platform: "",
    })

    const handleDownload = (fileName: string, platform: string, downloadUrl: string) => {
        setDownloadingScreen({
            isVisible: true,
            fileName,
            platform,
        })

        // Trigger actual download
        const link = document.createElement("a")
        link.href = downloadUrl
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const closeDownloadingScreen = () => {
        setDownloadingScreen({
            isVisible: false,
            fileName: "",
            platform: "",
        })
    }

    return (
        <div className="min-h-screen bg-background">

            <Navbar/>

            <section className="py-16 px-4">
                <div className="container mx-auto text-center max-w-4xl">
                    <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent border-accent/20">
                        <Download className="w-3 h-3 mr-1"/>
                        Latest Version 1.0.0
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">Download Converti</h1>
                    <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
                        Stat converting your files without worrying about their whereabouts. Choose your platform and
                        download the latest
                        version.
                    </p>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <Card className="border-2 hover:border-accent/50 transition-colors">
                            <CardHeader className="text-center">
                                <Monitor className="w-12 h-12 text-accent mx-auto mb-4"/>
                                <CardTitle>Windows</CardTitle>
                                <CardDescription>Windows 10/11 (64-bit)</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <Button
                                    className="w-full mb-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                                    onClick={() =>
                                        handleDownload(
                                            "converti-1.0.0-windows-x64.exe",
                                            "Windows",
                                            "https://drive.google.com/uc?export=download&id=1cIzZiGVOuTqw2PTX3ThgwVkGRG5zpjpF",
                                        )
                                    }
                                >
                                    <Download className="w-4 h-4 mr-2"/>
                                    Download for Windows
                                </Button>
                                <p className="text-sm text-muted-foreground">
                                    converti-1.0.0-windows-x64.exe
                                    <br/>
                                    Size: 45.2 MB
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:border-accent/50 transition-colors">
                            <CardHeader className="text-center">
                                <Monitor className="w-12 h-12 text-accent mx-auto mb-4"/>
                                <CardTitle>macOS</CardTitle>
                                <CardDescription>macOS 11.0+ (Intel & Apple Silicon)</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <Button
                                    className="w-full mb-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                                    onClick={() =>
                                        handleDownload(
                                            "converti-1.0.0-macos-universal.dmg",
                                            "macOS",
                                            "#",
                                        )
                                    }
                                >
                                    <Download className="w-4 h-4 mr-2"/>
                                    Download for macOS
                                </Button>
                                <p className="text-sm text-muted-foreground">
                                    converti-1.0.0-macos-universal.dmg
                                    <br/>
                                    Size: 52.8 MB
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:border-accent/50 transition-colors">
                            <CardHeader className="text-center">
                                <Monitor className="w-12 h-12 text-accent mx-auto mb-4"/>
                                <CardTitle>Linux</CardTitle>
                                <CardDescription>Ubuntu 20.04+ / Debian 11+</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <Button
                                    className="w-full mb-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                                    onClick={() =>
                                        handleDownload(
                                            "converti-1.0.0-linux-x64.AppImage",
                                            "Linux",
                                            "#",
                                        )
                                    }
                                >
                                    <Download className="w-4 h-4 mr-2"/>
                                    Download for Linux
                                </Button>
                                <p className="text-sm text-muted-foreground">
                                    converti-1.0.0-linux-x64.AppImage
                                    <br/>
                                    Size: 48.1 MB
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mb-12">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Github className="w-5 h-5 mr-2"/>
                                Alternative Downloads
                            </CardTitle>
                            <CardDescription>Additional download options and source code access</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Button variant="outline" className="justify-start h-auto p-4 bg-transparent group">
                                    <Link href="https://github.com/YassineKh2/Converti"
                                          target="_blank" rel="noopener noreferrer" className="text-left  ">
                                        <div className="font-medium">GitHub Releases</div>
                                        <div className="text-sm text-muted-foreground group-hover:text-white">Download
                                            source code
                                        </div>
                                    </Link>
                                </Button>
                                <Button variant="outline" className="justify-start h-auto p-4 bg-transparent group">
                                    <div className="text-left">
                                        <div className="font-medium">Previous Versions</div>
                                        <div className="text-sm text-muted-foreground group-hover:text-white">Coming
                                            soon...
                                        </div>
                                    </div>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section id="requirements" className="py-12 px-4 bg-muted/30">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-4">System Requirements</h2>
                        <p className="text-muted-foreground">Converti is designed to run efficiently on modern
                            systems</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Monitor className="w-5 h-5 mr-2"/>
                                    Windows
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <Cpu className="w-4 h-4 mt-1 text-accent"/>
                                    <div>
                                        <div className="font-medium text-sm">Processor</div>
                                        <div className="text-sm text-muted-foreground">64-bit Intel or AMD</div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <MemoryStick className="w-4 h-4 mt-1 text-accent"/>
                                    <div>
                                        <div className="font-medium text-sm">Memory</div>
                                        <div className="text-sm text-muted-foreground">4 GB RAM minimum</div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <HardDrive className="w-4 h-4 mt-1 text-accent"/>
                                    <div>
                                        <div className="font-medium text-sm">Storage</div>
                                        <div className="text-sm text-muted-foreground">200 MB free space</div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Monitor className="w-4 h-4 mt-1 text-accent"/>
                                    <div>
                                        <div className="font-medium text-sm">OS Version</div>
                                        <div className="text-sm text-muted-foreground">Windows 10/11</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Monitor className="w-5 h-5 mr-2"/>
                                    macOS
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <Cpu className="w-4 h-4 mt-1 text-accent"/>
                                    <div>
                                        <div className="font-medium text-sm">Processor</div>
                                        <div className="text-sm text-muted-foreground">Intel or Apple Silicon</div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <MemoryStick className="w-4 h-4 mt-1 text-accent"/>
                                    <div>
                                        <div className="font-medium text-sm">Memory</div>
                                        <div className="text-sm text-muted-foreground">4 GB RAM minimum</div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <HardDrive className="w-4 h-4 mt-1 text-accent"/>
                                    <div>
                                        <div className="font-medium text-sm">Storage</div>
                                        <div className="text-sm text-muted-foreground">250 MB free space</div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Monitor className="w-4 h-4 mt-1 text-accent"/>
                                    <div>
                                        <div className="font-medium text-sm">OS Version</div>
                                        <div className="text-sm text-muted-foreground">macOS 11.0+</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Monitor className="w-5 h-5 mr-2"/>
                                    Linux
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <Cpu className="w-4 h-4 mt-1 text-accent"/>
                                    <div>
                                        <div className="font-medium text-sm">Processor</div>
                                        <div className="text-sm text-muted-foreground">64-bit x86_64</div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <MemoryStick className="w-4 h-4 mt-1 text-accent"/>
                                    <div>
                                        <div className="font-medium text-sm">Memory</div>
                                        <div className="text-sm text-muted-foreground">4 GB RAM minimum</div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <HardDrive className="w-4 h-4 mt-1 text-accent"/>
                                    <div>
                                        <div className="font-medium text-sm">Storage</div>
                                        <div className="text-sm text-muted-foreground">220 MB free space</div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Monitor className="w-4 h-4 mt-1 text-accent"/>
                                    <div>
                                        <div className="font-medium text-sm">Distribution</div>
                                        <div className="text-sm text-muted-foreground">Ubuntu 20.04+</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-4">Installation Instructions</h2>
                        <p className="text-muted-foreground">Simple steps to get Converti running on your system</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Monitor className="w-5 h-5 mr-2"/>
                                    Windows Installation
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                                        1
                                    </div>
                                    <div>
                                        <div className="font-medium">Download the installer</div>
                                        <div className="text-sm text-muted-foreground">Click the Windows download button
                                            above
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                                        2
                                    </div>
                                    <div>
                                        <div className="font-medium">Run the installer</div>
                                        <div className="text-sm text-muted-foreground">Double-click the downloaded .exe
                                            file
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                                        3
                                    </div>
                                    <div>
                                        <div className="font-medium">Follow the setup wizard</div>
                                        <div className="text-sm text-muted-foreground">Accept the license and choose
                                            install location
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 mt-0.5 text-green-500"/>
                                    <div>
                                        <div className="font-medium">Launch Converti</div>
                                        <div className="text-sm text-muted-foreground">Find it in your Start menu or
                                            desktop
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Monitor className="w-5 h-5 mr-2"/>
                                    macOS Installation
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                                        1
                                    </div>
                                    <div>
                                        <div className="font-medium">Download the DMG file</div>
                                        <div className="text-sm text-muted-foreground">Click the macOS download button
                                            above
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                                        2
                                    </div>
                                    <div>
                                        <div className="font-medium">Open the DMG file</div>
                                        <div className="text-sm text-muted-foreground">Double-click to mount the disk
                                            image
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                                        3
                                    </div>
                                    <div>
                                        <div className="font-medium">Drag to Applications</div>
                                        <div className="text-sm text-muted-foreground">Drag Converti to your
                                            Applications folder
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 mt-0.5 text-green-500"/>
                                    <div>
                                        <div className="font-medium">Launch from Applications</div>
                                        <div className="text-sm text-muted-foreground">Find Converti in your
                                            Applications folder
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Monitor className="w-5 h-5 mr-2"/>
                                    Linux Installation
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                                        1
                                    </div>
                                    <div>
                                        <div className="font-medium">Download AppImage</div>
                                        <div className="text-sm text-muted-foreground">Click the Linux download button
                                            above
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                                        2
                                    </div>
                                    <div>
                                        <div className="font-medium">Make executable</div>
                                        <div className="text-sm text-muted-foreground">chmod +x
                                            converti-1.0.0-linux-x64.AppImage
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                                        3
                                    </div>
                                    <div>
                                        <div className="font-medium">Run the AppImage</div>
                                        <div className="text-sm text-muted-foreground">Double-click or run from
                                            terminal
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 mt-0.5 text-green-500"/>
                                    <div>
                                        <div className="font-medium">No installation needed</div>
                                        <div className="text-sm text-muted-foreground">Converti runs directly from the
                                            AppImage
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <Footer/>

        </div>
    )
}
