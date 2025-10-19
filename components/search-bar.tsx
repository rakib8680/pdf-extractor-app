"use client"

import { Search, X, FileText, ChevronUp, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useRef } from "react"

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  fileName: string
  currentMatchIndex: number
  onNavigateMatch: (index: number) => void
  totalMatches: number
  onUploadNew: () => void
  onGoHome: () => void
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  fileName,
  currentMatchIndex,
  onNavigateMatch,
  totalMatches,
  onUploadNew,
  onGoHome,
}: SearchBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handlePreviousMatch = () => {
    if (totalMatches > 0) {
      const newIndex = currentMatchIndex > 0 ? currentMatchIndex - 1 : totalMatches - 1
      onNavigateMatch(newIndex)
    }
  }

  const handleNextMatch = () => {
    if (totalMatches > 0) {
      const newIndex = currentMatchIndex < totalMatches - 1 ? currentMatchIndex + 1 : 0
      onNavigateMatch(newIndex)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (searchQuery && totalMatches > 0) {
        if (event.key === "ArrowUp") {
          event.preventDefault()
          handlePreviousMatch()
        } else if (event.key === "ArrowDown") {
          event.preventDefault()
          handleNextMatch()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [searchQuery, totalMatches, currentMatchIndex])

  return (
    <div className="relative">
      <Card className="p-6 transition-theme backdrop-blur-glass border-primary/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span className="font-medium truncate">{fileName}</span>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search within extracted content..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 h-12 text-base transition-theme backdrop-blur-sm border-primary/20 focus:border-primary/40"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 transition-theme cursor-pointer hover:bg-primary/10"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {searchQuery && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Searching for: <span className="font-medium text-foreground">"{searchQuery}"</span>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1 transition-theme backdrop-blur-sm">
                {totalMatches > 0 ? `${currentMatchIndex + 1} of ${totalMatches}` : "0 matches"}
              </Badge>

              {totalMatches > 0 && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousMatch}
                    className="h-8 w-8 p-0 bg-transparent transition-theme cursor-pointer backdrop-blur-sm border-primary/20 hover:bg-primary/10"
                    disabled={totalMatches === 0}
                    title="Previous match (↑)"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextMatch}
                    className="h-8 w-8 p-0 bg-transparent transition-theme cursor-pointer backdrop-blur-sm border-primary/20 hover:bg-primary/10"
                    disabled={totalMatches === 0}
                    title="Next match (↓)"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {searchQuery && totalMatches > 0 && (
          <div className="mt-2 text-xs text-muted-foreground">Use ↑↓ arrow keys to navigate between matches</div>
        )}
      </Card>

      {searchQuery && totalMatches > 0 && (
        <div className="fixed top-20 right-4 z-50 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3 transition-theme border-primary/20">
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium">
              {currentMatchIndex + 1} of {totalMatches}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousMatch}
                className="h-8 w-8 p-0 bg-transparent transition-theme cursor-pointer border-primary/20 hover:bg-primary/10"
                title="Previous match (↑)"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextMatch}
                className="h-8 w-8 p-0 bg-transparent transition-theme cursor-pointer border-primary/20 hover:bg-primary/10"
                title="Next match (↓)"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
