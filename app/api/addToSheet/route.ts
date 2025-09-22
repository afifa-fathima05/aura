import { NextResponse } from "next/server";
import { appendToSheet } from "@/lib/googlesheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      membershipId,
      name,
      rollNumber,
      registerNumber,
      year,
      section,
      department,
      email,
      participation,
    } = body;

    // Build sheet tab name: e.g., AI&DS-2027
    const sheetName = `${department}-${year}`;

    // Prepare row data
    const values = [
      membershipId,
      name,
      rollNumber,
      registerNumber,
      year,
      section,
      department,
      email,
      participation,
      new Date().toISOString(),
    ];

    // Append row to correct sheet
    await appendToSheet({ values, sheetName });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error writing to Google Sheets:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}