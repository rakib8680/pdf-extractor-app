"use client"

import { Card } from "@/components/ui/card"
import { FileText, Search, Download, Zap, Shield, Sparkles, ArrowRight } from "lucide-react"

export function LandingContent() {
  const features = [
    {
      icon: FileText,
      title: "Smart Text Extraction",
      description: "Advanced PDF parsing technology extracts text with perfect formatting and structure preservation.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Search,
      title: "Powerful Search",
      description: "Find any word or phrase instantly with real-time highlighting and navigation between matches.",
      gradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Download,
      title: "Export Options",
      description: "Download extracted text, print documents, or copy to clipboard with a single click.",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process PDFs instantly in your browser. No uploads, no waiting, no server delays.",
      gradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
    },
    {
      icon: Shield,
      title: "100% Private",
      description: "Your documents never leave your device. All processing happens locally in your browser.",
      gradient: "from-red-500/20 to-rose-500/20",
      borderColor: "border-red-500/30",
    },
    {
      icon: Sparkles,
      title: "Professional Tools",
      description: "View modes, line numbers, statistics, and formatting options for professional document analysis.",
      gradient: "from-indigo-500/20 to-violet-500/20",
      borderColor: "border-indigo-500/30",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Upload Your PDF",
      description: "Drag and drop or click to select any PDF document from your device.",
      icon: FileText,
    },
    {
      number: "02",
      title: "Extract Instantly",
      description: "Our advanced engine processes your PDF and extracts all text content in seconds.",
      icon: Zap,
    },
    {
      number: "03",
      title: "Search & Export",
      description: "Search through content, view statistics, and export in your preferred format.",
      icon: Download,
    },
  ]

  return (
    <div className="space-y-32 mt-24">
      {/* Features Section */}
      <section className="space-y-16 relative">
        <div className="text-center space-y-6">
          <div className="inline-block">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Features</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-balance leading-tight">
              Everything you need
            </h2>
            <p className="text-lg text-primary font-light italic mt-2">for professional PDF extraction</p>
          </div>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
            Powerful tools designed for efficiency, privacy, and ease of use. Extract, search, and analyze your
            documents with confidence.
          </p>
        </div>

        {/* Background blur for features section */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`p-8 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm ${feature.borderColor} border-2 hover:border-opacity-100 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group`}
            >
              <div className="space-y-4">
                <div className="p-3 bg-primary/10 rounded-lg w-fit group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold leading-tight">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-16 relative">
        <div className="text-center space-y-6">
          <div className="inline-block">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Process</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-balance leading-tight">Simple & Intuitive</h2>
            <p className="text-lg text-primary font-light italic mt-2">three steps to success</p>
          </div>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
            Our streamlined workflow makes PDF extraction effortless. From upload to export, everything is optimized for
            your productivity.
          </p>
        </div>

        {/* Background blur for how it works section */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 h-full hover:border-purple-500/40 transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="text-6xl font-bold text-primary/20 font-serif">{step.number}</div>
                    <step.icon className="h-8 w-8 text-primary/60 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold leading-tight">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-primary/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative">
        <div className="bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-12 relative overflow-hidden">
          {/* Background blur for stats section */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-balance mb-3">Why Choose Us</h2>
              <p className="text-lg text-muted-foreground">Industry-leading performance and reliability</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-3 p-6 rounded-lg bg-background/30 backdrop-blur-sm border border-green-500/10 hover:border-green-500/30 transition-all">
                <div className="text-4xl md:text-5xl font-bold text-primary font-serif">100%</div>
                <div className="text-sm text-muted-foreground font-medium">Private & Secure</div>
              </div>
              <div className="space-y-3 p-6 rounded-lg bg-background/30 backdrop-blur-sm border border-green-500/10 hover:border-green-500/30 transition-all">
                <div className="text-4xl md:text-5xl font-bold text-primary font-serif">&lt;1s</div>
                <div className="text-sm text-muted-foreground font-medium">Processing Time</div>
              </div>
              <div className="space-y-3 p-6 rounded-lg bg-background/30 backdrop-blur-sm border border-green-500/10 hover:border-green-500/30 transition-all">
                <div className="text-4xl md:text-5xl font-bold text-primary font-serif">100MB</div>
                <div className="text-sm text-muted-foreground font-medium">File Size Limit</div>
              </div>
              <div className="space-y-3 p-6 rounded-lg bg-background/30 backdrop-blur-sm border border-green-500/10 hover:border-green-500/30 transition-all">
                <div className="text-4xl md:text-5xl font-bold text-primary font-serif">Free</div>
                <div className="text-sm text-muted-foreground font-medium">Forever</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
