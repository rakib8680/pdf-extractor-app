import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting PDF extraction process")

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.log("[v0] No file provided in request")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.type !== "application/pdf") {
      console.log("[v0] File type is not PDF:", file.type)
      return NextResponse.json({ error: "File must be a PDF" }, { status: 400 })
    }

    console.log("[v0] Processing PDF file:", file.name, "Size:", file.size)

    // Convert file to array buffer and return it to client for processing
    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString("base64")

    console.log("[v0] Converted file to base64, returning to client for processing")

    return NextResponse.json({
      fileData: base64,
      fileName: file.name,
      fileSize: file.size,
    })
  } catch (error) {
    console.error("[v0] Error processing PDF:", error)
    return NextResponse.json(
      {
        error: "Failed to process PDF file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
