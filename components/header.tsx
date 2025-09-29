"use client"

import { FileText, Github, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 transition-theme">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg transition-theme">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">PDF Extractor Pro</h1>
            <p className="text-sm text-muted-foreground">Professional document processing</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="text-muted-foreground transition-theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground transition-theme">
            Help
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground transition-theme">
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </Button>
        </div>
      </div>
    </header>
  )
}
