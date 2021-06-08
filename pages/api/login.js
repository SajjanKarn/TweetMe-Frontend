import axios from "axios";
import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const loginRes = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const result = await loginRes.json();

    if (!loginRes.ok) {
      res.json({ error: "Incorred username or password." });
    } else {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", result.token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          secure: process.env.NODE_ENV !== "development",
          path: "/",
        })
      );
      res.status(200).json({ user: result.user });
      return;
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  }
};
