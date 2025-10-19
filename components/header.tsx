"use client"

import { FileText, Sun, Moon, Home, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { useRouter, usePathname } from "next/navigation"

interface HeaderProps {
  showNavigation?: boolean
  onUploadNew?: () => void
  onGoHome?: () => void
}

export function Header({ showNavigation = false, onUploadNew, onGoHome }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const handleHome = () => {
    if (onGoHome) {
      onGoHome()
    } else {
      router.push("/")
    }
  }

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 transition-theme">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
          <div className="p-2 bg-primary/10 rounded-lg transition-theme">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">PDF Extractor Pro</h1>
            <p className="text-sm text-muted-foreground">Professional document processing</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showNavigation && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleHome}
                className="gap-2 transition-theme bg-transparent backdrop-blur-sm border-primary/20 hover:bg-primary/10 cursor-pointer"
                title="Back to home"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onUploadNew}
                className="gap-2 transition-theme bg-transparent backdrop-blur-sm border-primary/20 hover:bg-primary/10 cursor-pointer"
                title="Upload another PDF"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Upload New</span>
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="text-muted-foreground transition-theme cursor-pointer"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
