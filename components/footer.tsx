"use client"

import { Github, Heart, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-background/50 backdrop-blur-sm mt-32 relative z-10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">PDF Extractor Pro</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional PDF text extraction and analysis tool. Extract, search, and export with confidence.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>by</span>
              <a
                href="https://github.com/rakib8680"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                Rakib Khan
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">Smart Text Extraction</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Advanced Search</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Multiple Export Formats</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">100% Private & Secure</li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex flex-col gap-3">
              <Button variant="outline" size="sm" className="justify-start gap-2 cursor-pointer bg-transparent" asChild>
                <a href="https://github.com/rakib8680" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 cursor-pointer bg-transparent" asChild>
                <a href="mailto:contact@example.com">
                  <Mail className="h-4 w-4" />
                  Contact
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© {currentYear} PDF Extractor Pro. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
