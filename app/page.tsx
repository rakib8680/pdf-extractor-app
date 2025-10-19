"use client"

import type React from "react"

import { useState, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { UploadZone } from "@/components/upload-zone"
import { ExtractedContent } from "@/components/extracted-content"
import { SearchBar } from "@/components/search-bar"
import { LandingContent } from "@/components/landing-content"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [extractedText, setExtractedText] = useState<string>("")
  const [fileName, setFileName] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const totalMatches = useMemo(() => {
    if (!searchQuery.trim() || !extractedText) return 0
    const regex = new RegExp(searchQuery.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&"), "gi")
    return (extractedText.match(regex) || []).length
  }, [extractedText, searchQuery])

  const processExtractedText = (rawText: string): string => {
    const lines = rawText.split("\n")
    const processedLines: string[] = []
    let currentParagraph = ""

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      if (!line) {
        if (currentParagraph) {
          processedLines.push(currentParagraph.trim())
          currentParagraph = ""
        }
        processedLines.push("")
        continue
      }

      if (line.startsWith("--- Page")) {
        if (currentParagraph) {
          processedLines.push(currentParagraph.trim())
          currentParagraph = ""
        }
        processedLines.push("")
        processedLines.push(line)
        processedLines.push("")
        continue
      }

      const wordCount = line.split(/\s+/).length
      const isVeryShortLine = wordCount <= 4 && line.length < 60
      const endsWithPunctuation = /[.!?:;]$/.test(line)
      const endsWithComma = /[,]$/.test(line)

      const nextLine = lines[i + 1]?.trim()
      const nextIsShort = nextLine && nextLine.split(/\s+/).length <= 4
      const nextStartsWithCapital = nextLine && /^[A-Z]/.test(nextLine)

      if (isVeryShortLine && !endsWithPunctuation && nextLine && !nextLine.startsWith("---")) {
        currentParagraph += (currentParagraph ? " " : "") + line
      } else if (endsWithComma || (!endsWithPunctuation && !nextStartsWithCapital && nextLine)) {
        currentParagraph += (currentParagraph ? " " : "") + line
      } else {
        currentParagraph += (currentParagraph ? " " : "") + line
        processedLines.push(currentParagraph.trim())
        currentParagraph = ""
      }
    }

    if (currentParagraph) {
      processedLines.push(currentParagraph.trim())
    }

    return processedLines.join("\n")
  }

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true)
    setFileName(file.name)

    try {
      const { extractText, getDocumentProxy } = await import("unpdf")

      const arrayBuffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)

      const pdf = await getDocumentProxy(uint8Array)

      const { totalPages, text } = await extractText(pdf, { mergePages: false })

      let formattedText = ""
      if (Array.isArray(text)) {
        text.forEach((pageText, index) => {
          if (pageText.trim()) {
            formattedText += `\n--- Page ${index + 1} ---\n${pageText.trim()}\n`
          }
        })
      } else if (typeof text === "string") {
        formattedText = text
      }

      const processedText = processExtractedText(formattedText.trim())

      setExtractedText(processedText)
    } catch (error) {
      console.error("Error extracting PDF:", error)
      alert("Failed to extract PDF content. Please try again with a different PDF file.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentMatchIndex(0)
  }

  const handleUploadNewPDF = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleReset = () => {
    setExtractedText("")
    setFileName("")
    setSearchQuery("")
    setCurrentMatchIndex(0)
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setExtractedText("")
      setFileName("")
      setSearchQuery("")
      setCurrentMatchIndex(0)
      handleFileUpload(file)
    }
    event.target.value = ""
  }

  return (
    <div className="min-h-screen bg-background transition-theme relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-blue-50/20 to-purple-50/30 dark:from-purple-950/30 dark:via-blue-950/20 dark:to-purple-950/25"></div>

        <motion.div
          className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-primary/35 to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        ></motion.div>

        <motion.div
          className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-primary/25 to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        ></motion.div>

        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        ></motion.div>

        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-black/20 pointer-events-none"></div>
      </div>

      <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileInputChange} className="hidden" />

      <Header showNavigation={!!extractedText} onUploadNew={handleUploadNewPDF} onGoHome={handleReset} />

      <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10 flex-1">
        {!extractedText ? (
          <>
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 text-foreground leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              >
                Extract and Search{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  PDF Content
                </span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Upload your PDF documents and instantly extract all text content with powerful search capabilities
              </motion.p>
            </motion.div>

            <UploadZone onFileUpload={handleFileUpload} isProcessing={isProcessing} />

            <LandingContent />
          </>
        ) : (
          <div className="space-y-6">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              fileName={fileName}
              currentMatchIndex={currentMatchIndex}
              onNavigateMatch={setCurrentMatchIndex}
              totalMatches={totalMatches}
              onUploadNew={handleUploadNewPDF}
              onGoHome={handleReset}
            />
            <ExtractedContent
              text={extractedText}
              searchQuery={searchQuery}
              fileName={fileName}
              currentMatchIndex={currentMatchIndex}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
