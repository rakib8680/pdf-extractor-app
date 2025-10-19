"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

export function UploadZone({ onFileUpload, isProcessing }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    disabled: isProcessing,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.15,
      transition: { duration: 0.3 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 3.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex justify-center mb-6"
        variants={badgeVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Free Beta Access
          </span>
        </div>
      </motion.div>

      <Card
        {...getRootProps()}
        className={cn(
          "border transition-all duration-300 cursor-pointer relative overflow-hidden",
          "backdrop-blur-xl bg-white/8 dark:bg-white/5",
          "hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/25",
          "border-primary/25 dark:border-primary/35",
          isDragActive &&
            "border-primary/80 bg-primary/15 shadow-2xl shadow-primary/40",
          isProcessing && "cursor-not-allowed opacity-50",
          "bg-gradient-to-br from-white/10 via-white/5 to-white/8 dark:from-white/8 dark:via-white/3 dark:to-white/5"
        )}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, rgba(192, 132, 252, 0.05) 50%, rgba(167, 139, 250, 0.05) 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/5 pointer-events-none"></div>

        {/* Top-right radial light source */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary/25 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none"></div>

        {/* Bottom-left ambient glow */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none"></div>

        {/* Center subtle glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <input {...getInputProps()} />

        <div className="p-12 text-center space-y-6 relative z-10">
          {isProcessing ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="mx-auto w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/25 shadow-lg shadow-primary/20">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Processing PDF...
                </h3>
                <p className="text-muted-foreground">
                  Extracting text content from your document
                </p>
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
                className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30 group hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <motion.div animate="animate" variants={floatingVariants}>
                  <Upload className="h-8 w-8 text-primary" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-3 flex flex-col md:flex-row items-center justify-center gap-3 text-foreground leading-tight">
                  <span>Upload</span>
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                    PDF Content
                  </span>
                  <motion.div animate="animate" variants={floatingVariants}>
                    <Sparkles className="h-6 w-6 text-primary" />
                  </motion.div>
                </h3>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Drag and drop your PDF file here, or click to browse. Instant
                  text extraction with powerful search capabilities.
                </p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="gap-2 bg-gradient-to-r from-primary/15 to-primary/10 backdrop-blur-sm border-primary/40 hover:bg-primary/20 hover:border-primary/60 cursor-pointer transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-primary/20"
                  >
                    <FileText className="h-4 w-4" />
                    Choose PDF File
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="text-sm text-muted-foreground space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p>Supported format: PDF (max 100MB)</p>
                <p className="text-xs text-primary/70 font-medium">
                  ✨ AI-Powered Text Extraction with Advanced Search
                </p>
              </motion.div>
            </>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
