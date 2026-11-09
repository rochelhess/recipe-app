import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { signToken, setAuthCookie } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    const valid = user && (await bcrypt.compare(password, user.password));

    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    setAuthCookie(res, signToken(user.id));
    res.status(200).json({ user });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}
