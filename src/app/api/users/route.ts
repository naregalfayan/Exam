import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";

const db = new Database("test.db");

export async function GET() {
  try {
    const rows = db.prepare("SELECT * FROM users").all();
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { errors: ["Failed to fetch users."] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, surname, username, salary } = await request.json();
    const errors = [];

    if (!name || !surname || !username || !salary) {
      errors.push("All fields must be filled.");
    }
    if (isNaN(salary)) {
      errors.push("Salary must be a number.");
    }
    const existingUser = db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get(username);
    if (existingUser) {
      errors.push("Username already exists.");
    }

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const stmt = db.prepare(
      "INSERT INTO users (name, surname, username, salary) VALUES (?, ?, ?, ?)"
    );
    stmt.run(name, surname, username, salary);

    return NextResponse.json(
      { message: "User added successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { errors: ["Failed to add user."] },
      { status: 500 }
    );
  }
}
