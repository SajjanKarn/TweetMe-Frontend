import axios from "axios";
import { API_URL } from "@/config/index";
import cookie from "cookie";
import { parseCookie } from "@/helpers/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { token } = parseCookie(req);
    if (!token) return res.json({ error: "Not Authorized." });

    const tweetRes = await fetch(`${API_URL}/api/user/tweet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tweet: req.body.tweet }),
    });
    const result = await tweetRes.json();
    
    if (!tweetRes.ok) {
      res.status(400).json({ error: result.error });
      return;
    } else {
      res.status(200).json({ message: "success" });
      return;
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  }
};
