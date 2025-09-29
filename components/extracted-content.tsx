"use client"

import { useMemo, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExtractedContentProps {
  text: string
  searchQuery: string
  fileName: string
  currentMatchIndex: number
}

export function ExtractedContent({ text, searchQuery, fileName, currentMatchIndex }: ExtractedContentProps) {
  const { toast } = useToast()
  const contentRef = useRef<HTMLDivElement>(null)

  const highlightedText = useMemo(() => {
    if (!searchQuery.trim()) return text

    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")})`, "gi")

    let matchCount = 0
    const highlighted = text.replace(regex, (match) => {
      const isCurrentMatch = matchCount === currentMatchIndex
      const className = isCurrentMatch
        ? "bg-primary text-primary-foreground px-1 rounded font-bold ring-2 ring-primary/50 shadow-lg"
        : "bg-primary/20 text-primary-foreground px-1 rounded"

      const result = `<mark class="${className}" data-match-index="${matchCount}">${match}</mark>`
      matchCount++
      return result
    })

    return highlighted
  }, [text, searchQuery, currentMatchIndex])

  useEffect(() => {
    if (searchQuery && contentRef.current) {
      const currentMatchElement = contentRef.current.querySelector(`[data-match-index="${currentMatchIndex}"]`)
      if (currentMatchElement) {
        currentMatchElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  }, [currentMatchIndex, searchQuery])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied to clipboard",
        description: "The extracted text has been copied to your clipboard.",
      })
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
      })
    }
  }

  const downloadText = () => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${fileName.replace(".pdf", "")}_extracted.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Extracted Content</h2>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2 bg-transparent">
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={downloadText} className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div
          ref={contentRef}
          className="prose prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap font-mono"
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        />
      </Card>
    </div>
  )
}
