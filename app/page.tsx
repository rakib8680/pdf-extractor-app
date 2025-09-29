"use client"

import type React from "react"

import { useState, useMemo, useRef } from "react"
import { Header } from "@/components/header"
import { UploadZone } from "@/components/upload-zone"
import { ExtractedContent } from "@/components/extracted-content"
import { SearchBar } from "@/components/search-bar"

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

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true)
    setFileName(file.name)

    try {
      console.log("[v0] Starting PDF processing with unpdf")

      const { extractText, getDocumentProxy } = await import("unpdf")

      const arrayBuffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)

      console.log("[v0] Loading PDF document")
      const pdf = await getDocumentProxy(uint8Array)

      console.log("[v0] Extracting text from all pages")
      const { totalPages, text } = await extractText(pdf, { mergePages: false })

      console.log("[v0] PDF processed successfully, pages:", totalPages)

      // Format the text with page separators
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

      console.log("[v0] Text extraction completed, total length:", formattedText.length)
      setExtractedText(formattedText.trim())
    } catch (error) {
      console.error("[v0] Error extracting PDF:", error)
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

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      // Reset state first
      setExtractedText("")
      setFileName("")
      setSearchQuery("")
      setCurrentMatchIndex(0)
      // Then process new file
      handleFileUpload(file)
    }
    // Reset input value to allow selecting the same file again
    event.target.value = ""
  }

  return (
    <div className="min-h-screen bg-background transition-theme relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 gradient-primary rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 gradient-primary rounded-full blur-3xl opacity-15 animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 gradient-primary rounded-full blur-3xl opacity-10 animate-pulse-slow"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileInputChange} className="hidden" />

      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-balance mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Extract and Search PDF Content
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Upload your PDF documents and instantly extract all text content with powerful search capabilities
          </p>
        </div>

        {!extractedText ? (
          <UploadZone onFileUpload={handleFileUpload} isProcessing={isProcessing} />
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
    </div>
  )
}
