import { NextResponse } from "next/server";
export const runtime = "nodejs";
import clientPromise from "@/lib/mongodb";

// GET user by email
export async function GET(req, { params }) {
  try {
    const { email } = await params;
    const client = await clientPromise;
    const db = client.db("eventFlowDB");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne(
      { email },
      { projection: { password: 0 } } // Exclude password
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// UPDATE user by email
export async function PUT(req, { params }) {
  try {
    const { email } = await params;
    const updateData = await req.json();
    const client = await clientPromise;
    const db = client.db("eventFlowDB");
    const usersCollection = db.collection("users");

    // Remove immutable/sensitive fields if present
    delete updateData.email;
    delete updateData.password;
    delete updateData._id;

    const result = await usersCollection.updateOne(
      { email },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
