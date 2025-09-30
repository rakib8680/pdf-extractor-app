"use client"

import { Card } from "@/components/ui/card"
import { FileText, Search, Download, Zap, Shield, Sparkles } from "lucide-react"

export function LandingContent() {
  const features = [
    {
      icon: FileText,
      title: "Smart Text Extraction",
      description: "Advanced PDF parsing technology extracts text with perfect formatting and structure preservation.",
    },
    {
      icon: Search,
      title: "Powerful Search",
      description: "Find any word or phrase instantly with real-time highlighting and navigation between matches.",
    },
    {
      icon: Download,
      title: "Export Options",
      description: "Download extracted text, print documents, or copy to clipboard with a single click.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process PDFs instantly in your browser. No uploads, no waiting, no server delays.",
    },
    {
      icon: Shield,
      title: "100% Private",
      description: "Your documents never leave your device. All processing happens locally in your browser.",
    },
    {
      icon: Sparkles,
      title: "Professional Tools",
      description: "View modes, line numbers, statistics, and formatting options for professional document analysis.",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Upload Your PDF",
      description: "Drag and drop or click to select any PDF document from your device.",
    },
    {
      number: "02",
      title: "Extract Instantly",
      description: "Our advanced engine processes your PDF and extracts all text content in seconds.",
    },
    {
      number: "03",
      title: "Search & Export",
      description: "Search through content, view statistics, and export in your preferred format.",
    },
  ]

  return (
    <div className="space-y-24 mt-24">
      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Everything you need for PDF text extraction</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Professional-grade tools designed for efficiency, privacy, and ease of use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="space-y-4">
                <div className="p-3 bg-primary/10 rounded-lg w-fit">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">How it works</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Three simple steps to extract and analyze your PDF documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="space-y-4">
                <div className="text-6xl font-bold text-primary/20">{step.number}</div>
                <h3 className="text-2xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative">
        <Card className="p-12 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 backdrop-blur-sm border-primary/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Private & Secure</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">0s</div>
              <div className="text-sm text-muted-foreground">Upload Time</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">File Size Limit</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">Free</div>
              <div className="text-sm text-muted-foreground">Forever</div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
