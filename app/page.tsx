"use client"

import { useState, useMemo } from "react"
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
    setExtractedText("")
    setFileName("")
    setSearchQuery("")
    setCurrentMatchIndex(0)
  }

  return (
    <div className="min-h-screen bg-background transition-theme">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-balance mb-4">Extract and Search PDF Content</h1>
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
