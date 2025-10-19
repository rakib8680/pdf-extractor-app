"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, Loader2, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
    },
  }

  return (
    <motion.div className="max-w-2xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
      <Card
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed transition-all duration-300 cursor-pointer relative overflow-hidden",
          "backdrop-blur-xl bg-white/10 dark:bg-white/5",
          "hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20",
          "border-primary/30 dark:border-primary/40",
          isDragActive && "border-primary/80 bg-primary/10 shadow-2xl shadow-primary/30",
          isProcessing && "cursor-not-allowed opacity-50",
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <input {...getInputProps()} />

        <div className="p-12 text-center space-y-6 relative z-10">
          {isProcessing ? (
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
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
            </motion.div>
          ) : (
            <>
              <motion.div
                className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20 group hover:shadow-lg hover:shadow-primary/30"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <motion.div animate="animate" variants={floatingVariants}>
                  <Upload className="h-8 w-8 text-primary" />
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-2 text-foreground">
                  {isDragActive ? "Drop your PDF here" : "Upload PDF Document"}
                  <motion.div animate="animate" variants={floatingVariants}>
                    <Sparkles className="h-5 w-5 text-primary" />
                  </motion.div>
                </h3>
                <p className="text-muted-foreground mb-4">Drag and drop your PDF file here, or click to browse</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="gap-2 bg-primary/10 backdrop-blur-sm border-primary/30 hover:bg-primary/20 hover:border-primary/50 cursor-pointer transition-all duration-300"
                  >
                    <FileText className="h-4 w-4" />
                    Choose PDF File
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <p>Supported format: PDF (max 100MB)</p>
                <p className="text-xs mt-1 text-primary/70">✨ Advanced text extraction with search capabilities</p>
              </motion.div>
            </>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
