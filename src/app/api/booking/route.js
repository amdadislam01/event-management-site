import { NextResponse } from "next/server";
export const runtime = "nodejs";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const client = await clientPromise;
    const db = client.db("eventFlowDB");
    const bookingCollection = db.collection("ticket");

    const query = {};
    if (email) {
      query.userEmail = email;
    }

    const result = await bookingCollection.find(query).toArray();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { userEmail, eventId } = body;

    if (!userEmail || !eventId) {
      return NextResponse.json({ error: "Email and Event ID are required." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("eventFlowDB");
    const bookingCollection = db.collection("ticket");

    const existingBooking = await bookingCollection.findOne({
      userEmail,
      eventId,
    });

    if (existingBooking) {
      return NextResponse.json({ error: "You have already booked this ticket." }, { status: 400 });
    }

    const result = await bookingCollection.insertOne(body);
    return NextResponse.json({ message: "Booking successful", result }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
