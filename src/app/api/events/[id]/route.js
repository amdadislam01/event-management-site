import { NextResponse } from "next/server";
export const runtime = "nodejs";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("eventFlowDB");
    const eventCollection = db.collection("events");

    const result = await eventCollection.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("eventFlowDB");
    const eventCollection = db.collection("events");

    const result = await eventCollection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("eventFlowDB");
    const eventCollection = db.collection("events");

    const updatedData = await req.json();
    
    // Remove _id from updatedData to avoid error when updating
    delete updatedData._id;
    
    // Ensure date is a Date object if provided
    if (updatedData.date) {
      updatedData.date = new Date(updatedData.date);
    }

    const result = await eventCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
