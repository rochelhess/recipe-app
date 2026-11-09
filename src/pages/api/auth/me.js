import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getUserIdFromRequest } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(200).json({ user: null });
  }

  try {
    await connectDB();
    const user = await User.findById(userId);
    res.status(200).json({ user: user || null });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}
