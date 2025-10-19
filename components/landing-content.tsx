"use client";

import { Card } from "@/components/ui/card";
import {
  FileText,
  Search,
  Download,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export function LandingContent() {
  const features = [
    {
      icon: FileText,
      title: "Smart Text Extraction",
      description:
        "Advanced PDF parsing technology extracts text with perfect formatting and structure preservation.",
      gradient: "from-purple-500/15 to-violet-500/15",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Search,
      title: "Powerful Search",
      description:
        "Find any word or phrase instantly with real-time highlighting and navigation between matches.",
      gradient: "from-violet-500/15 to-purple-500/15",
      borderColor: "border-violet-500/30",
    },
    {
      icon: Download,
      title: "Export Options",
      description:
        "Download extracted text, print documents, or copy to clipboard with a single click.",
      gradient: "from-purple-600/15 to-indigo-500/15",
      borderColor: "border-purple-600/30",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Process PDFs instantly in your browser. No uploads, no waiting, no server delays.",
      gradient: "from-indigo-500/15 to-purple-500/15",
      borderColor: "border-indigo-500/30",
    },
    {
      icon: Shield,
      title: "100% Private",
      description:
        "Your documents never leave your device. All processing happens locally in your browser.",
      gradient: "from-purple-500/15 to-fuchsia-500/15",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Sparkles,
      title: "Professional Tools",
      description:
        "View modes, line numbers, statistics, and formatting options for professional document analysis.",
      gradient: "from-fuchsia-500/15 to-violet-500/15",
      borderColor: "border-fuchsia-500/30",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Your PDF",
      description:
        "Drag and drop or click to select any PDF document from your device.",
      icon: FileText,
    },
    {
      number: "02",
      title: "Extract Instantly",
      description:
        "Our advanced engine processes your PDF and extracts all text content in seconds.",
      icon: Zap,
    },
    {
      number: "03",
      title: "Search & Export",
      description:
        "Search through content, view statistics, and export in your preferred format.",
      icon: Download,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="space-y-32 mt-24 relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-500/20 to-violet-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-violet-500/15 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-br from-fuchsia-500/15 to-violet-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Features Section */}
      <motion.section
        className="space-y-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="text-center space-y-6" variants={itemVariants}>
          <div className="inline-block">
            <motion.p
              className="text-sm font-semibold text-primary uppercase tracking-widest mb-2"
              variants={itemVariants}
            >
              Features
            </motion.p>
            <motion.h2
              className="text-5xl md:text-6xl font-serif font-bold text-balance leading-tight"
              variants={itemVariants}
            >
              Everything you need
            </motion.h2>
            <motion.p
              className="text-lg text-primary font-light italic mt-2"
              variants={itemVariants}
            >
              for professional PDF extraction
            </motion.p>
          </div>
          <motion.p
            className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Powerful tools designed for efficiency, privacy, and ease of use.
            Extract, search, and analyze your documents with confidence.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants} whileHover="hover">
              <Card
                className={`p-8 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm ${feature.borderColor} border-2 hover:border-opacity-100 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group h-full`}
              >
                <div className="space-y-4">
                  <motion.div
                    className="p-3 bg-primary/10 rounded-lg w-fit"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <feature.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="space-y-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="text-center space-y-6" variants={itemVariants}>
          <div className="inline-block">
            <motion.p
              className="text-sm font-semibold text-primary uppercase tracking-widest mb-2"
              variants={itemVariants}
            >
              Process
            </motion.p>
            <motion.h2
              className="text-5xl md:text-6xl font-serif font-bold text-balance leading-tight"
              variants={itemVariants}
            >
              Simple & Intuitive
            </motion.h2>
            <motion.p
              className="text-lg text-primary font-light italic mt-2"
              variants={itemVariants}
            >
              three steps to success
            </motion.p>
          </div>
          <motion.p
            className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Our streamlined workflow makes PDF extraction effortless. From
            upload to export, everything is optimized for your productivity.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
          variants={containerVariants}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 h-full hover:border-purple-500/40 transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <motion.div
                      className="text-6xl font-bold text-primary/20 font-serif"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.2,
                      }}
                    >
                      {step.number}
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <step.icon className="h-8 w-8 text-primary/60 group-hover:text-primary transition-colors" />
                    </motion.div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:flex absolute top-1/2 -right-4 items-center justify-center"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ArrowRight className="h-6 w-6 text-primary/30" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div
          className="bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-fuchsia-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-12 relative overflow-hidden"
          whileHover={{ borderColor: "rgba(168, 85, 247, 0.4)" }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-full blur-3xl pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-fuchsia-500/15 to-purple-500/15 rounded-full blur-3xl pointer-events-none"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <motion.div className="relative z-10" variants={containerVariants}>
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-balance mb-3">
                Why Choose Us
              </h2>
              <p className="text-lg text-muted-foreground">
                Industry-leading performance and reliability
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              variants={containerVariants}
            >
              {[
                { value: "100%", label: "Private & Secure" },
                { value: "<1s", label: "Processing Time" },
                { value: "100MB", label: "File Size Limit" },
                { value: "Free", label: "Forever" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="space-y-3 p-6 rounded-lg bg-background/30 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/30 transition-all"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className={`${
                      (index === 2 && "relative right-6 md:right-0") ||
                      (index === 0 && "relative right-2 md:right-0")
                    }  text-3xl md:text-5xl font-bold text-primary font-serif`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.2,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className=" text-xs  md:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
