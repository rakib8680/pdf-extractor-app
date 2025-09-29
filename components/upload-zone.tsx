"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, Loader2 } from "lucide-react"
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
          "border-2 border-dashed transition-all duration-200 cursor-pointer",
          "hover:border-primary/50 hover:bg-accent/50",
          isDragActive && "border-primary bg-primary/5",
          isProcessing && "cursor-not-allowed opacity-50",
        )}
      >
        <input {...getInputProps()} />

        <div className="p-12 text-center space-y-6">
          {isProcessing ? (
            <>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Processing PDF...</h3>
                <p className="text-muted-foreground">Extracting text content from your document</p>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary" />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {isDragActive ? "Drop your PDF here" : "Upload PDF Document"}
                </h3>
                <p className="text-muted-foreground mb-4">Drag and drop your PDF file here, or click to browse</p>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <FileText className="h-4 w-4" />
                  Choose PDF File
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Supported format: PDF (max 10MB)</p>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
