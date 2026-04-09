import { NextResponse } from "next/server";
export const runtime = "nodejs";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("eventFlowDB");
    const usersCollection = db.collection("users");

    const user = await req.json();
    const existingUser = await usersCollection.findOne({
      userId: user.userId || user.email,
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" });
    }

    user.createdAt = new Date();
    const result = await usersCollection.insertOne(user);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
