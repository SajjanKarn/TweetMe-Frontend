import axios from "axios";
import { API_URL } from "@/config/index";
import cookie from "cookie";
import { parseCookie } from "@/helpers/index";

export default async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body.id);
    const { token } = parseCookie(req);
    if (!token) return res.json({ error: "Not Authorized." });

    const likeRes = await fetch(
      `${API_URL}/api/user/tweet/${req.body.id}/like`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await likeRes.json();
    console.log(result);
    if (!likeRes.ok) {
      return res.json({ error: "Something went wrong." });
    } else {
      return res.status(200).json({ message: "post has been liked." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  }
};
