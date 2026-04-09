import { NextResponse } from "next/server";
export const runtime = "nodejs";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Owner email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("eventFlowDB");
    const eventCollection = db.collection("events");

    const result = await eventCollection.find({ ownerEmail: email }).toArray();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
