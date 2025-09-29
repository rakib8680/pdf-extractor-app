"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, Loader2, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UploadZoneProps {
  onFileUpload: (file: File) => void
  isProcessing: boolean
}

export function UploadZone({ onFileUpload, isProcessing }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0])
      }
    },
    [onFileUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    disabled: isProcessing,
  })

  return (
    <div className="max-w-2xl mx-auto">
      <Card
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed transition-all duration-300 cursor-pointer backdrop-blur-glass relative overflow-hidden",
          "hover:border-primary/50 hover:bg-accent/50 hover:shadow-xl hover:shadow-primary/10",
          isDragActive && "border-primary bg-primary/5 shadow-lg shadow-primary/20",
          isProcessing && "cursor-not-allowed opacity-50",
        )}
      >
        <div className="absolute inset-0 gradient-secondary opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>

        <input {...getInputProps()} />

        <div className="p-12 text-center space-y-6 relative z-10">
          {isProcessing ? (
            <>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Processing PDF...</h3>
                <p className="text-muted-foreground">Extracting text content from your document</p>
                <div className="flex items-center justify-center gap-1 mt-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-8 w-8 text-primary" />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                  {isDragActive ? "Drop your PDF here" : "Upload PDF Document"}
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                </h3>
                <p className="text-muted-foreground mb-4">Drag and drop your PDF file here, or click to browse</p>
                <Button
                  variant="outline"
                  className="gap-2 bg-transparent backdrop-blur-sm border-primary/20 hover:bg-primary/10 cursor-pointer"
                >
                  <FileText className="h-4 w-4" />
                  Choose PDF File
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Supported format: PDF (max 10MB)</p>
                <p className="text-xs mt-1 text-primary/70">✨ Advanced text extraction with search capabilities</p>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
