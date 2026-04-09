import { NextResponse } from "next/server";
export const runtime = "nodejs";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("eventFlowDB");
    const eventCollection = db.collection("events");

    const result = await eventCollection
      .find({ status: "Upcoming" })
      .sort({ createAt: -1 })
      .limit(6)
      .toArray();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
