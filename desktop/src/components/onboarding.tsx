"use client"

import {useEffect, useRef, useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {CheckCircle, ChevronLeft, ChevronRight, Sparkles, X} from "lucide-react"
import {slides} from "@/Helpers/getSlides";
import {Slide} from "@/type/Slide";

interface OnboardingSlidesProps {
    onComplete: () => void
    onSkip: () => void
}


function WelcomeAnimation() {
    const [isVisible, setIsVisible] = useState(false)
    const [sparkleIndex, setSparkleIndex] = useState(0)

    useEffect(() => {
        setIsVisible(true)
        const sparkleInterval = setInterval(() => {
            setSparkleIndex((prev) => (prev + 1) % 3)
        }, 800)

        return () => clearInterval(sparkleInterval)
    }, [])


    return (
        <div className="relative flex items-center justify-center h-16 mb-4">
            <div
                className={`transition-all duration-1000 ease-out ${
                    isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
            >
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div
                            className="h-12 w-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                            <img src="/Logo.png" className="h-6 w-6 animate-spin-reverse "
                                 style={{animationDuration: "3s"}} alt="logo"/>
                        </div>
                        <Sparkles
                            className={`absolute -top-2 -right-2 h-4 w-4 text-purple-400 transition-opacity duration-300 ${
                                sparkleIndex === 0 ? "opacity-100" : "opacity-30"
                            }`}
                        />
                        <Sparkles
                            className={`absolute -bottom-1 -left-2 h-3 w-3 text-violet-400 transition-opacity duration-300 ${
                                sparkleIndex === 1 ? "opacity-100" : "opacity-30"
                            }`}
                        />
                        <Sparkles
                            className={`absolute top-0 left-8 h-3 w-3 text-teal-400 transition-opacity duration-300 ${
                                sparkleIndex === 2 ? "opacity-100" : "opacity-30"
                            }`}
                        />
                    </div>
                    <div className="text-left">
                        <h1 className="text-3xl font-bold text-purple-600">
                            Converti
                        </h1>
                        <p className="text-sm text-muted-foreground">File Conversion Made Simple</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function OnboardingSlide({slide, isActive,nextGif}: { slide: Slide; isActive: boolean, nextGif: string }) {
    return (
        <div
            className={`transition-all duration-500 ease-in-out ${
                isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
        >
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        {slide.hasWelcomeAnimation && <WelcomeAnimation/>}

                        <div className="space-y-4">
                            <div>
                                <Badge variant="outline" className="mb-3 text-xs">
                                    Step {slide.id} of {slides.length}
                                </Badge>
                                <h2 className="text-3xl font-bold text-foreground mb-2">{slide.title}</h2>
                                <h3 className="text-xl text-purple-600 font-medium mb-4">{slide.subtitle}</h3>
                            </div>

                            <p className="text-muted-foreground text-lg leading-relaxed">{slide.description}</p>

                            <div className="space-y-3">
                                <h4 className="font-semibold text-foreground">Key Features:</h4>
                                <ul className="space-y-2">
                                    {slide.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0"/>
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <Card
                            className="bg-gradient-to-br from-purple-50 via-violet-50 to-teal-50 border-2 border-dashed border-purple-200 hover:border-purple-300 transition-colors">
                            <CardContent className="p-2">
                                <div
                                    className="w-full bg-white rounded-lg shadow-inner border flex items-center justify-center relative overflow-hidden">
                                    <img
                                        src={`onboarding/${slide.media ? slide.media : nextGif}`}
                                        alt={`${slide.title} demonstration`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>

                                <div className="mt-4 text-center">
                                    <p className="text-sm text-muted-foreground">
                                        {slide.hasWelcomeAnimation ? "Interactive Demo" : "Feature Demonstration"}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function OnboardingSlides({onComplete, onSkip}: OnboardingSlidesProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isVisible, setIsVisible] = useState(true)
    const [nextGif, setNextGif] = useState("drag and drop.gif");
    const currentGif = useRef("drag and drop.gif");
    const gifList = [
        "drag and drop.gif",
        "select format.gif",
        "progressbar.gif",
        "archive.gif",
        "settings.gif"
    ]

    useEffect(() => {

        const getNextGif = setInterval(() => {
            const index = gifList.indexOf(currentGif.current)

            if (index === gifList.length) {
                setNextGif(gifList[0])
                currentGif.current = gifList[0]
                return
            }

            setNextGif(gifList[index + 1])
            currentGif.current = gifList[index + 1]

        }, 8000)

        return () => clearInterval(getNextGif);

    }, [])

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1)
        } else {
            handleComplete()
        }
    }

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1)
        }
    }

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    const handleComplete = () => {
        const setAppSettings = async () => {
            return await window.ipcRenderer.invoke("appSettings", {
                firstLunch: false
            });
        };
        setAppSettings().then(() => {
            setIsVisible(false)
            setTimeout(() => {
                onComplete()
            }, 300)
        })

    }

    const handleSkip = () => {
        const setAppSettings = async () => {
            return await window.ipcRenderer.invoke("appSettings", {
                firstLunch: false
            });
        };
        setAppSettings().then(() => {
            setIsVisible(false)
            setTimeout(() => {
                onComplete()
            }, 300)
        })
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto">
                <Card className="shadow-2xl border-2">
                    <CardContent className="p-0">
                        <div
                            className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-50 via-violet-50 to-teal-50">
                            <div className="flex items-center gap-4">
                                <div>
                                    <h1 className="font-bold text-lg">Getting Started with Converti</h1>
                                    <p className="text-sm text-muted-foreground">Learn the basics in just a few
                                        minutes</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={handleSkip} className="text-muted-foreground">
                                <X className="h-4 w-4"/>
                            </Button>
                        </div>

                        <div className="p-8 min-h-[500px] flex items-center">
                            <OnboardingSlide slide={slides[currentSlide]} isActive={true} nextGif={nextGif}/>
                        </div>

                        <div className="p-6 border-t bg-muted/30">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {slides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`h-2 w-2 rounded-full transition-all duration-200 ${
                                                index === currentSlide
                                                    ? "bg-purple-500 w-6"
                                                    : index < currentSlide
                                                        ? "bg-teal-500"
                                                        : "bg-muted-foreground/30"
                                            }`}
                                        />
                                    ))}
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
                                        Skip Tour
                                    </Button>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={prevSlide}
                                            disabled={currentSlide === 0}
                                            className="flex items-center gap-2 bg-transparent"
                                        >
                                            <ChevronLeft className="h-4 w-4"/>
                                            Previous
                                        </Button>

                                        <Button
                                            onClick={nextSlide}
                                            className="bg-secondary text-white hover:bg-purple-600 flex items-center gap-2"
                                        >
                                            {currentSlide === slides.length - 1 ? (
                                                <>
                                                    Get Started
                                                    <Sparkles className="h-4 w-4"/>
                                                </>
                                            ) : (
                                                <>
                                                    Next
                                                    <ChevronRight className="h-4 w-4"/>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
