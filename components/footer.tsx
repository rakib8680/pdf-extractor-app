"use client"

import { Github, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-24 relative z-10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>by</span>
            <a
              href="https://github.com/rakib8680"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              Rakib Khan
              <Github className="h-4 w-4" />
            </a>
          </div>

          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PDF Extractor Pro. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
