import { NextResponse } from "next/server";
export const runtime = "nodejs";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("eventFlowDB");
    const eventCollection = db.collection("events");

    const result = await eventCollection.find().toArray();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("eventFlowDB");
    const eventCollection = db.collection("events");

    const event = await req.json();
    event.createAt = new Date();
    event.date = new Date(event.date);

    const result = await eventCollection.insertOne(event);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
