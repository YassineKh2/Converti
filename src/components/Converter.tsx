import type React from "react"

import { useState, useCallback } from "react"
import { Upload, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { UploadedFile as UploadedFileType} from "@/type/UploadedFile";
import {getFileCategory} from "@/Helpers/getFileCategory";
import {formatFileSize} from "@/Helpers/formatFileSize";
import {getConversionOptions} from "@/Helpers/getConversionOptions";
import {getFileIcon} from "@/Helpers/getFileIcon";

import { useToast } from "@/hooks/use-toast"


export default function FileConverter() {
    const [uploadedFile, setUploadedFile] = useState<UploadedFileType | null>(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const [selectedFormat, setSelectedFormat] = useState<string>("")

    const { toast } = useToast()

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)

        const files = Array.from(e.dataTransfer.files)
        if (files.length > 0) {
            const file = files[0]
            const category = getFileCategory(file.type)

            setUploadedFile({
                file,
                name: file.name,
                size: formatFileSize(file.size),
                type: file.type,
                category
            })
            setSelectedFormat("")
        }
    }, [])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const file = files[0]
            const category = getFileCategory(file.type)

            setUploadedFile({
                file,
                name: file.name,
                size: formatFileSize(file.size),
                type: file.type,
                category,
            })
            setSelectedFormat("")
        }
    }

    const handleConvert = () => {
        if (uploadedFile && selectedFormat) {
            toast({
                description: "Hold tight , your conversion has started !",
            })
            alert(`Converting ${uploadedFile.name} to ${selectedFormat} format...`)
        }
    }

    const clearFile = () => {
        setUploadedFile(null)
        setSelectedFormat("")
    }

    const conversionOptions = uploadedFile ? getConversionOptions(uploadedFile.category, uploadedFile.type) : []

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">File Converter</h1>
                    <p className="text-gray-600">Drag and drop any file to convert it to different formats</p>
                </div>

                {!uploadedFile ? (
                    <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                        <CardContent className="p-12">
                            <div
                                className={`text-center ${isDragOver ? "bg-blue-50 border-blue-300" : ""} rounded-lg p-8 transition-colors`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Drop your file here</h3>
                                <p className="text-gray-500 mb-4">Support for images, videos, audio, documents, and more</p>
                                <div className="flex items-center justify-center">
                                    <Button asChild>
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            Choose File
                                            <input id="file-upload" type="file" className="hidden" onChange={handleFileSelect} />
                                        </label>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-3">
                                        {getFileIcon(uploadedFile.category)}
                                        Uploaded File
                                    </CardTitle>
                                    <Button variant="ghost" size="icon" onClick={clearFile}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {uploadedFile.size} • {uploadedFile.type}
                                        </p>
                                    </div>
                                    <Badge variant="secondary" className="capitalize">
                                        {uploadedFile.category}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Choose Conversion Format</CardTitle>
                                <CardDescription>Select the format you want to convert your file to</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
                                    {conversionOptions.map((format) => (
                                        <Button
                                            key={format}
                                            // @ts-ignore
                                            variant={selectedFormat === format ? "default" : "outline"}
                                            className="h-12"
                                            onClick={() => setSelectedFormat(format)}
                                        >
                                            {format}
                                        </Button>
                                    ))}
                                </div>

                                {selectedFormat && (
                                    <>
                                        <Separator className="my-4" />
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Convert to {selectedFormat}</p>
                                                <p className="text-sm text-gray-500">
                                                    {uploadedFile.name} → {uploadedFile.name.replace(/\.[^/.]+$/, "")}.
                                                    {selectedFormat.toLowerCase()}
                                                </p>
                                            </div>
                                            <Button onClick={handleConvert} size="lg">
                                                Convert File
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
