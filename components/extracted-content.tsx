"use client"

import { useMemo, useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download, FileText, Clock, Type, Printer, CheckCheck, AlignLeft, List, Maximize2 } from "lucide-react"
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
  const [showStats, setShowStats] = useState(true)
  const [viewMode, setViewMode] = useState<"formatted" | "raw" | "compact">("formatted")
  const [showLineNumbers, setShowLineNumbers] = useState(false)

  const statistics = useMemo(() => {
    const words = text.trim().split(/\s+/).length
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, "").length
    const lines = text.split("\n").length
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length
    const readingTime = Math.ceil(words / 200) // Average reading speed: 200 words per minute

    return {
      words,
      characters,
      charactersNoSpaces,
      lines,
      paragraphs,
      readingTime,
    }
  }, [text])

  const formattedText = useMemo(() => {
    if (!text) return ""

    if (viewMode === "raw") {
      return `<pre class="whitespace-pre-wrap font-mono text-sm">${text}</pre>`
    }

    if (viewMode === "compact") {
      const compactText = text.replace(/\n\s*\n/g, "\n").trim()
      return `<div class="space-y-2">${compactText
        .split("\n")
        .map((line) => {
          if (line.startsWith("--- Page")) {
            return `<div class="text-sm font-semibold text-primary/70 my-4 py-2 border-t border-b border-primary/20">${line}</div>`
          }
          return line.trim() ? `<p class="mb-2">${line.trim()}</p>` : ""
        })
        .join("")}</div>`
    }

    const lines = text.split("\n")
    const formatted: string[] = []
    let lineNumber = 1

    for (const line of lines) {
      const trimmed = line.trim()

      if (trimmed.startsWith("--- Page")) {
        formatted.push(
          `<div class="text-sm font-semibold text-primary/70 my-6 py-2 border-t border-b border-primary/20 flex items-center gap-2">
            ${showLineNumbers ? `<span class="text-muted-foreground text-xs w-12">${lineNumber}</span>` : ""}
            <span>${trimmed}</span>
          </div>`,
        )
        lineNumber++
        continue
      }

      if (!trimmed) {
        formatted.push("<br/>")
        continue
      }

      formatted.push(
        `<p class="mb-4 flex ${showLineNumbers ? "gap-4" : ""}">
          ${showLineNumbers ? `<span class="text-muted-foreground text-xs w-12 flex-shrink-0 select-none">${lineNumber}</span>` : ""}
          <span class="flex-1">${trimmed}</span>
        </p>`,
      )
      lineNumber++
    }

    return formatted.join("")
  }, [text, viewMode, showLineNumbers])

  const highlightedText = useMemo(() => {
    if (!searchQuery.trim()) return formattedText

    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")})`, "gi")

    let matchCount = 0
    const highlighted = formattedText.replace(regex, (match: string) => {
      const isCurrentMatch = matchCount === currentMatchIndex
      const className = isCurrentMatch
        ? "bg-primary text-primary-foreground px-1 rounded font-bold ring-2 ring-primary/50 shadow-lg"
        : "bg-primary/20 text-primary-foreground px-1 rounded"

      const result = `<mark class="${className}" data-match-index="${matchCount}">${match}</mark>`
      matchCount++
      return result
    })

    return highlighted
  }, [formattedText, searchQuery, currentMatchIndex])

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
    console.log("[v0] Copy button clicked")
    try {
      await navigator.clipboard.writeText(text)
      console.log("[v0] Text copied successfully")
      toast({
        title: "✓ Copied!",
        description: `${text.split(/\s+/).length.toLocaleString()} words copied to clipboard.`,
        duration: 3000,
      })
    } catch (error) {
      console.error("[v0] Copy failed:", error)
      toast({
        title: "❌ Copy failed",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const downloadText = () => {
    console.log("[v0] Download button clicked")
    try {
      const blob = new Blob([text], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${fileName.replace(".pdf", "")}_extracted.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      console.log("[v0] Download started")
      toast({
        title: "✓ Downloaded!",
        description: `${fileName.replace(".pdf", "")}_extracted.txt`,
        duration: 3000,
      })
    } catch (error) {
      console.error("[v0] Download failed:", error)
      toast({
        title: "❌ Download failed",
        description: "Could not download the file.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const selectAllText = () => {
    console.log("[v0] Select All button clicked")

    if (!contentRef.current) {
      console.error("[v0] Content ref not found")
      return
    }

    try {
      // Focus the container so the browser visibly highlights the selection
      contentRef.current.focus()

      const selection = window.getSelection()
      if (!selection) {
        console.error("[v0] Window selection not available")
        throw new Error("Selection API not available")
      }

      selection.removeAllRanges()
      // Try native selectAllChildren first
      let usedNativeSelection = false
      try {
        selection.selectAllChildren(contentRef.current)
        usedNativeSelection = true
      } catch {
        // Fallback: use a Range across the container
        const range = document.createRange()
        range.selectNodeContents(contentRef.current)
        selection.addRange(range)
      }

      // If selection is still empty (Safari/edge cases), temporarily make the node contentEditable and execCommand
      const selectionEmpty = !selection.anchorNode || !contentRef.current.contains(selection.anchorNode)
      if (!usedNativeSelection || selectionEmpty) {
        const node = contentRef.current
        const prevCE = node.getAttribute("contenteditable")
        node.setAttribute("contenteditable", "true")
        node.focus()
        try {
          document.execCommand("selectAll")
        } catch {}
        // Keep the highlight visible briefly, then restore contentEditable
        setTimeout(() => {
          if (prevCE === null) {
            node.removeAttribute("contenteditable")
          } else {
            node.setAttribute("contenteditable", prevCE)
          }
        }, 250)
      }

      // Ensure the selected area is visible
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "center" })

      console.log("[v0] Text selected successfully")

      toast({
        title: "✓ Text Selected!",
        description: `All ${statistics.words.toLocaleString()} words are now selected. Press Ctrl+C (⌘+C on Mac) to copy.`,
        duration: 4000,
      })

      setTimeout(async () => {
        try {
          await navigator.clipboard.writeText(text)
          console.log("[v0] Auto-copy after select all successful")
        } catch (e) {
          console.log("[v0] Auto-copy not available, user needs to manually copy")
        }
      }, 100)
    } catch (error) {
      console.error("[v0] Select all failed:", error)

      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast({
            title: "✓ Copied!",
            description: "Text selection not available, but content was copied to clipboard.",
            duration: 3000,
          })
        })
        .catch(() => {
          toast({
            title: "❌ Selection failed",
            description: "Could not select or copy text. Please try selecting manually.",
            variant: "destructive",
            duration: 3000,
          })
        })
    }
  }

  const printText = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${fileName}</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                max-width: 800px;
                margin: 40px auto;
                padding: 20px;
                color: #333;
              }
              h1 {
                font-size: 24px;
                margin-bottom: 20px;
                color: #000;
              }
              .content {
                white-space: pre-wrap;
                font-size: 14px;
              }
              @media print {
                body { margin: 0; padding: 20px; }
              }
            </style>
          </head>
          <body>
            <h1>${fileName}</h1>
            <div class="content">${formattedText}</div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Extracted Content</h2>
            <p className="text-sm text-muted-foreground">From {fileName}</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 border border-border rounded-lg p-1">
              <Button
                variant={viewMode === "formatted" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("formatted")}
                className="h-8 px-3 cursor-pointer"
                title="Formatted view with paragraphs"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "compact" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("compact")}
                className="h-8 px-3 cursor-pointer"
                title="Compact view with minimal spacing"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "raw" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("raw")}
                className="h-8 px-3 cursor-pointer"
                title="Raw text view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant={showLineNumbers ? "default" : "outline"}
              size="sm"
              onClick={() => setShowLineNumbers(!showLineNumbers)}
              className="gap-2 cursor-pointer"
              title="Toggle line numbers"
            >
              <Type className="h-4 w-4" />
              {showLineNumbers ? "Hide" : "Show"} Lines
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={selectAllText}
              className="gap-2 bg-transparent cursor-pointer"
              title="Select all text"
            >
              <CheckCheck className="h-4 w-4" />
              Select All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="gap-2 bg-transparent cursor-pointer"
              title="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadText}
              className="gap-2 bg-transparent cursor-pointer"
              title="Download as text file"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={printText}
              className="gap-2 bg-transparent cursor-pointer"
              title="Print document"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        {showStats && (
          <Card className="p-4 bg-accent/30 backdrop-blur-sm border-primary/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Document Statistics
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowStats(false)}
                className="h-6 text-xs cursor-pointer"
              >
                Hide
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Words</p>
                <p className="text-lg font-semibold">{statistics.words.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Characters</p>
                <p className="text-lg font-semibold">{statistics.characters.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">No Spaces</p>
                <p className="text-lg font-semibold">{statistics.charactersNoSpaces.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Lines</p>
                <p className="text-lg font-semibold">{statistics.lines.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Paragraphs</p>
                <p className="text-lg font-semibold">{statistics.paragraphs.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Read Time
                </p>
                <p className="text-lg font-semibold">{statistics.readingTime} min</p>
              </div>
            </div>
          </Card>
        )}

        {!showStats && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStats(true)}
            className="gap-2 bg-transparent cursor-pointer"
          >
            <Type className="h-4 w-4" />
            Show Statistics
          </Button>
        )}
      </div>

      <Card className="overflow-hidden backdrop-blur-sm bg-card/50 border-primary/10">
        <div className="p-8">
          <div
            ref={contentRef}
            className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed selection:bg-primary/60 selection:text-primary-foreground focus:outline-none select-text"
            tabIndex={-1}
            style={{
              fontSize: viewMode === "compact" ? "14px" : "15px",
              lineHeight: viewMode === "compact" ? "1.6" : "1.8",
              fontFamily:
                viewMode === "raw"
                  ? "ui-monospace, monospace"
                  : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              userSelect: "text",
            }}
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        </div>
      </Card>
    </div>
  )
}
